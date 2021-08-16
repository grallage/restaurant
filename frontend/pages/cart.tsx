import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";

import Navbar from "containers/navbar/Navbar";
import Stripe from "stripe";
import _ from "lodash";
import Head from "containers/head/Head";

import {
  Container,
  MenuContainer,
  CartContainer,
  CartBody,
  CartFooter,
  CartTitle,
  CheckoutBtn,
  CartForm,
  InputGroup,
  InputLabel,
  Input,
  InputTextarea,
  CartFooterBox,
  TotalPriceText,
  TotalPriceLabel,
  MenuNavbar,
  MenuBody,
  MenuCartNumber,
  InValidFeedback,
} from "../components/cart/CartElements";
import { MenuItems, MenuCarts, CartMenus } from "containers/cart/MenuSection";
import FooterSection from "../containers/home/FooterSection";

import { formatAmountForDisplay } from "constants/StripeUtils";
import { useFormControls } from "components/cart/CartFormControls";

const CartPage = ({ menuList }) => {
  const [filterMenuName, setFilterMenuName] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const {
    formValues,
    setFormValues,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  } = useFormControls();

  useEffect(() => {
    const temMenuItems = new Set();
    menuList.forEach((item) => {
      temMenuItems.add(item.product.unit_label);
    });
    setMenuItems(Array.from(temMenuItems));
  }, []);

  useEffect(() => {
    const carts = cartItems.map((i) => {
      return { quantity: i.custom_count, price: i.id };
    });

    setFormValues({
      ...formValues,
      carts,
    });
  }, [cartItems]);

  const changeFilterMenuName = (name) => {
    setFilterMenuName(name);
  };
  const filterMenus = (name, index) => {
    if (filterMenuName === "") {
      return true;
    }
    return name.product.unit_label === filterMenuName;
  };
  const addToCarts = (item) => {
    const items = cartItems.slice();
    item = { ...item, custom_count: 1 };
    items.push(item);
    setCartItems(items);
  };

  const productInCarts = (id) => {
    return _.find(cartItems, { id: id });
  };

  const addProduct = (id) => {
    const items = cartItems.slice();
    let item = _.find(items, { id: id });
    const custom_count = item.custom_count + 1;
    item = { ...item, custom_count };
    var index = _.findIndex(items, { id });

    items.splice(index, 1, item);
    setCartItems(items);
  };

  const reduceProduct = (id) => {
    const items = cartItems.slice();
    let item = _.find(items, { id: id });
    const custom_count = item.custom_count - 1;
    if (custom_count <= 0) {
      _.remove(items, (i) => i.id === id);
      setCartItems(items);
      return;
    }
    item = { ...item, custom_count };
    var index = _.findIndex(items, { id });
    items.splice(index, 1, item);
    setCartItems(items);
  };

  const findCart = (id) => {
    return _.find(cartItems, { id });
  };

  const removeCart = (id) => {
    const items = cartItems.slice();
    _.remove(items, (i) => i.id === id);
    setCartItems(items);
  };

  return (
    <>
      <Head />
      <Navbar />
      <Container>
        <MenuContainer>
          <MenuNavbar>
            <MenuItems
              changeFilterMenuName={changeFilterMenuName}
              filterMenuName={filterMenuName}
              menuItems={menuItems}
            />
          </MenuNavbar>
          <MenuBody>
            <MenuCarts
              menuList={menuList.filter(filterMenus)}
              addProduct={addProduct}
              reduceProduct={reduceProduct}
              addToCarts={addToCarts}
              productInCarts={productInCarts}
              findCart={findCart}
            />
          </MenuBody>
        </MenuContainer>
        <CartContainer>
          <CartBody>
            <CartTitle>当前购物车</CartTitle>
            {cartItems.length === 0 && (
              <>
                饿了吧，立即点击{" "}
                <MenuCartNumber
                  className="empty"
                  style={{ width: "40px", display: "inline-block" }}
                >
                  +
                </MenuCartNumber>
                按钮列入购物车吧！
              </>
            )}
            {cartItems.length > 0 && (
              <>
                <CartMenus
                  cartItems={cartItems}
                  reduceProduct={reduceProduct}
                  addProduct={addProduct}
                  removeCart={removeCart}
                />

                <CartForm>
                  <InputGroup>
                    <InputLabel>联系电话</InputLabel>
                    <Input
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputValue}
                      onBlur={handleInputValue}
                      isInvalid={!!errors["phone"]}
                    />
                    <InValidFeedback>{errors["phone"]}</InValidFeedback>
                  </InputGroup>
                  <InputGroup>
                    <InputLabel>派送方式</InputLabel>
                    <InputTextarea
                      name="deliveryAddress"
                      value={formValues.deliveryAddress}
                      onChange={handleInputValue}
                      onBlur={handleInputValue}
                      isInvalid={!!errors["deliveryAddress"]}
                    />
                    <InValidFeedback>
                      {errors["deliveryAddress"]}
                    </InValidFeedback>
                  </InputGroup>
                  <InputGroup>
                    <InputLabel>备注信息</InputLabel>
                    <InputTextarea
                      name="remark"
                      value={formValues.remark}
                      onChange={handleInputValue}
                      onBlur={handleInputValue}
                      isInvalid={!!errors["remark"]}
                    />
                    <InValidFeedback>{errors["remark"]}</InValidFeedback>
                  </InputGroup>
                </CartForm>
              </>
            )}
          </CartBody>
          <CartFooter>
            {cartItems.length > 0 && (
              <>
                <CartFooterBox>
                  <TotalPriceLabel>总额：</TotalPriceLabel>
                  <TotalPriceText>
                    {formatAmountForDisplay(
                      _.sumBy(cartItems, (i) => {
                        return i.custom_count * i.unit_amount;
                      }),
                      cartItems[0].currency
                    )}
                  </TotalPriceText>
                </CartFooterBox>
                <CheckoutBtn
                  onClick={handleFormSubmit}
                  disabled={!formIsValid()}
                >
                  支付
                </CheckoutBtn>
              </>
            )}
          </CartFooter>
        </CartContainer>
      </Container>
      <FooterSection />
    </>
  );
};

export default CartPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const prices = [];

  for await (const price of stripe.prices.list({
    limit: 100,
    active: true,
    type: "one_time",
    expand: ["data.product"],
  })) {
    prices.push(price);
  }

  return {
    props: { menuList: prices },
    revalidate: 60 * 60, // In seconds
  };
};
