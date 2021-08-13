import React from "react";
import Image from "next/image";

import { AiOutlineClose as Delete } from "react-icons/ai";
import {
  Container,
  MenuContainer,
  CartContainer,
  CartBody,
  CartFooter,
  CartTitle,
  CheckoutBtn,
  CartMenu,
  CartItem,
  ItemImg,
  ItemTitle,
  ItemBox,
  ItemMinusBtn,
  ItemNumber,
  ItemAddBtn,
  ItemPrice,
  ItemDelBtn,
  CartForm,
  InputGroup,
  InputLabel,
  InputInput,
  InputTextarea,
  CartFooterBox,
  TotalPriceText,
  TotalPriceLabel,
  MenuNavbar,
  MenuItem,
  MenuBody,
  MenuCart,
  MenuCartImg,
  MenuCartBody,
  MenuCartTitle,
  MenuCartPrice,
  MenuCartBox,
  MenuCartMinusBtn,
  MenuCartPlusBtn,
  MenuCartNumber,
} from "components/cart/CartElements";

import { formatAmountForDisplay } from "constants/StripeUtils";

const MenuSection = () => {
  return <div></div>;
};

export default MenuSection;

// 菜单列表
export const MenuCarts = ({
  menuList,
  addProduct,
  reduceProduct,
  addToCarts,
  productInCarts,
  findCart,
}) => {
  return (
    <>
      {!menuList && <>暂无商品</>}
      {menuList &&
        // menuList.filter(filterMenus).map((item) => {
        menuList.map((item) => {
          return (
            <MenuCart key={item.id}>
              <MenuCartImg>
                <Image
                  src={item.product.images[0]}
                  layout="fill"
                  objectFit="cover"
                />
              </MenuCartImg>
              <MenuCartBody>
                <MenuCartTitle>{item.product.name}</MenuCartTitle>
                <MenuCartPrice>
                  {formatAmountForDisplay(item.unit_amount, item.currency)}
                </MenuCartPrice>
                <MenuCartBox>
                  {productInCarts(item.id) ? (
                    <>
                      <MenuCartMinusBtn
                        onClick={() => reduceProduct(item.id)}
                      />
                      <MenuCartNumber>
                        {findCart(item.id).custom_count}
                      </MenuCartNumber>
                      <MenuCartPlusBtn onClick={() => addProduct(item.id)} />
                    </>
                  ) : (
                    <MenuCartNumber
                      className="empty"
                      onClick={() => {
                        addToCarts(item);
                      }}
                    >
                      +
                    </MenuCartNumber>
                  )}
                </MenuCartBox>
              </MenuCartBody>
            </MenuCart>
          );
        })}
    </>
  );
};

// 菜单栏目
export const MenuItems = ({
  changeFilterMenuName,
  filterMenuName,
  menuItems,
}) => {
  return (
    <>
      <MenuItem>菜单</MenuItem>
      <MenuItem
        onClick={() => changeFilterMenuName("")}
        className={`${filterMenuName === "" ? "active" : ""}`}
      >
        所有
      </MenuItem>
      {menuItems.map((item) => {
        return (
          <MenuItem
            key={item}
            onClick={() => changeFilterMenuName(`${item}`)}
            className={`${filterMenuName === `${item}` ? "active" : ""}`}
          >
            {item}
          </MenuItem>
        );
      })}
    </>
  );
};

// 购物车栏
export const CartMenus = ({
  cartItems,
  reduceProduct,
  addProduct,
  removeCart,
}) => {
  return (
    <>
      {cartItems &&
        cartItems.map((item, index) => {
          return (
            <CartItem key={item.id}>
              <ItemImg>
                <Image
                  src={item.product.images[0]}
                  layout="fill"
                  objectFit="cover"
                />
              </ItemImg>
              <ItemTitle>{item.product.name}</ItemTitle>
              <ItemBox>
                <ItemMinusBtn onClick={() => reduceProduct(item.id)}>
                  -
                </ItemMinusBtn>
                <ItemNumber>{item.custom_count}</ItemNumber>
                <ItemAddBtn onClick={() => addProduct(item.id)}>+</ItemAddBtn>
              </ItemBox>
              <ItemPrice>
                {formatAmountForDisplay(
                  item.unit_amount * item.custom_count,
                  item.currency
                )}
              </ItemPrice>
              <ItemDelBtn onClick={() => removeCart(item.id)}>
                <Delete />
              </ItemDelBtn>
            </CartItem>
          );
        })}
    </>
  );
};
