import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  CardTotalPrice,
  OrderTotalPrice,
  OrderState,
  CardBoxWrapper,
} from "components/order/OrderElements";
import { formatAmountForDisplay } from "constants/StripeUtils";
import { useAxios } from "constants/AxiosConfig";

const OrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getOrders = async () => {
        const { axios } = useAxios();
        const orders = await axios
          .get(`${process.env.HOST}/payments_history/`)
          .then((res) => {
            setLoading(false);
            return res.data.checkouts;
          });
        console.log(orders);
        setOrders(orders);
      };
      getOrders();
    }
  }, []);
  return (
    <Container>
      <Wrapper>
        <Orders>
          {loading && <>加载中...</>}
          {!loading &&
            orders &&
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
                      {order.payment_status === "paid" ? "支付成功" : "未支付"}
                    </OrderState>
                  </OrderBody>
                </Order>
              );
            })}
        </Orders>
      </Wrapper>
    </Container>
  );
};

export default OrderSection;
