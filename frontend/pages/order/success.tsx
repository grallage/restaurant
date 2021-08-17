import React from "react";
import { GetServerSideProps } from "next";

import Image from "next/image";
import Navbar from "containers/navbar/Navbar";
import Stripe from "stripe";
import _ from "lodash";
import Head from "containers/head/Head";
import { formatAmountForDisplay } from "constants/StripeUtils";
import FooterSection from "containers/home/FooterSection";
import { TextContainer } from "components/BasicElements";
import {
  Container,
  Wrapper,
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
} from "components/order/OrderElements";

const Success = ({ payments_history }) => {
  return (
    <>
      <Head />
      <Navbar />
      {!payments_history && <TextContainer>数据不存在</TextContainer>}
      {payments_history && (
        <Container>
          <Wrapper>
            <Order>
              <OrderHeader>
                <OrderDate>
                  {new Intl.DateTimeFormat("zh-hans", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(payments_history.payment_intent.created * 1000)}
                </OrderDate>
                <OrderId>订单号：{payments_history.id}</OrderId>
              </OrderHeader>
              <OrderBody>
                <CardBoxWrapper>
                  {payments_history.line_items.map((item) => {
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
                    payments_history.amount_total,
                    payments_history.currency
                  )}
                </OrderTotalPrice>
                <OrderState>
                  {payments_history.payment_status === "paid"
                    ? "支付成功"
                    : "未支付"}
                </OrderState>
              </OrderBody>
            </Order>
          </Wrapper>
        </Container>
      )}
      <FooterSection />
    </>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getPaymentsHistory = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });

    const session_id = context.query.session_id! as string;
    const payments_history = {};
    const line_items = new Array();

    const session = await stripe.checkout.sessions.retrieve(session_id);
    payments_history["id"] = session.id;
    payments_history["amount_total"] = session.amount_total;
    payments_history["currency"] = session.currency;
    payments_history["customer"] = session.customer;
    payments_history["metadata"] = session.metadata;
    payments_history["payment_status"] = session.payment_status;

    const paymentIntents = await stripe.paymentIntents.retrieve(
      session.payment_intent as string
    );

    const payment_intent = {
      id: paymentIntents.id,
      created: paymentIntents.created,
      charges: paymentIntents.charges,
    };
    payments_history["payment_intent"] = payment_intent;

    const listLineItems = await stripe.checkout.sessions.listLineItems(
      session_id,
      { limit: 100 }
    );

    await Promise.all(
      listLineItems.data.map(async (item) => {
        const product = await stripe.products.retrieve(
          item.price.product as string
        );
        item["images"] = product.images;
        line_items.push(item);
      })
    );

    payments_history["line_items"] = line_items;
    return payments_history;
  };
  try {
    const payments_history = await getPaymentsHistory();
    // console.log(payments_history);
    return {
      props: { payments_history },
    };
  } catch {
    // ignore error
  }
  return {
    props: {},
  };
};
