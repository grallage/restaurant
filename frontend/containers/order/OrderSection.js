import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAxios } from "constants/AxiosConfig";
import { useAuth } from "constants/Hooks";
import {
  Container,
  Wrapper,
  Orders,
  Order,
  OrderHeader,
  OrderBody,
  OrderDate,
  OrderId,
  CardBox,
  CardImg,
  CardTitle,
  CardPrice,
  CardCount,
  OrderTotalPrice,
  OrderState,
  CardBoxWrapper,
  EmptyCartWrapper,
  EmptyCartIcon,
  EmptyCartTitle,
  EmptyCartSubtitle,
  ButtonGroup,
  Button,
} from "components/order/OrderElements";
import { formatAmountForDisplay } from "constants/StripeUtils";
import { LoadingContainer } from "components/BasicElements";

const OrderSection = () => {
  const { session } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = session.accessToken;
    if (token) {
      const getOrders = async () => {
        const { axios } = useAxios();
        const orders = await axios
          .get(`${process.env.NEXT_PUBLIC_HOST}/payments_history/`)
          .then((res) => {
            setLoading(false);
            return res.data.checkouts;
          });
        setOrders(orders);
      };
      getOrders();
    }
  }, []);
  return (
    <>
      {loading && <LoadingContainer />}
      {!loading && (
        <Container>
          <Wrapper>
            <Orders>
              {orders && orders.length === 0 && (
                <EmptyCartWrapper>
                  <EmptyCartIcon />
                  <EmptyCartTitle>还没有历史订单记录</EmptyCartTitle>
                  <EmptyCartSubtitle>
                    还等什么，点击下方立即订餐！
                  </EmptyCartSubtitle>
                  <ButtonGroup>
                    <Link href="/cart">
                      <Button>立即下单</Button>
                    </Link>
                  </ButtonGroup>
                </EmptyCartWrapper>
              )}
              {orders &&
                orders.length > 0 &&
                orders.map((order) => {
                  return (
                    <Order key={order.id}>
                      <OrderHeader>
                        <OrderDate>
                          {/* 2014-01-01 */}
                          {/* {new Intl.DateTimeFormat("en-US", { */}

                          {new Intl.DateTimeFormat("zh-hans", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }).format(order.payment_intent.created * 1000)}
                        </OrderDate>
                        <OrderId>订单号：{order.id}</OrderId>
                      </OrderHeader>
                      <OrderBody>
                        <CardBoxWrapper>
                          {order.line_items.map((item) => {
                            return (
                              <CardBox key={item.id}>
                                <CardImg>
                                  <Image
                                    src={item.images[0]}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                </CardImg>
                                <CardTitle>{item.description}</CardTitle>
                                <CardPrice>
                                  {formatAmountForDisplay(
                                    item.price.unit_amount,
                                    item.currency
                                  )}
                                  {/* {" "}
                              x {item.quantity} */}
                                </CardPrice>
                                <CardCount>x{item.quantity}</CardCount>
                              </CardBox>
                            );
                          })}
                        </CardBoxWrapper>
                        <OrderTotalPrice>
                          {formatAmountForDisplay(
                            order.amount_total,
                            order.currency
                          )}
                        </OrderTotalPrice>
                        <OrderState>
                          {order.payment_status === "paid"
                            ? "支付成功"
                            : "未支付"}
                        </OrderState>
                      </OrderBody>
                    </Order>
                  );
                })}
            </Orders>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default OrderSection;
