import React from "react";
import dynamic from "next/dynamic";
import Navbar from "containers/navbar/Navbar";
import FooterSection from "containers/home/FooterSection";
import { GetStaticProps } from "next";
import { withAuth } from "constants/HOCs";
import Head from "containers/head/Head";

// import OrderSection from "containers/order/OrderSection";
// const OrderSection = dynamic(() => import("containers/order/OrderSection"), {
//   loading: () => <OrderSection />,
// });
const OrderSection = dynamic(() => import("containers/order/OrderSection"));

const orderPage = () => {
  return (
    <>
      <Head title="历史订单" />
      <Navbar />
      <OrderSection />
      <FooterSection />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default withAuth()(orderPage);
