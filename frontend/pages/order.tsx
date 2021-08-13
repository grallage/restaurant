import React from "react";
import dynamic from "next/dynamic";
import Navbar from "containers/navbar/Navbar";
import FooterSection from "containers/home/FooterSection";
// import OrderSection from "containers/order/OrderSection";

import { withAuth } from "constants/HOCs";
// const OrderSection = dynamic(() => import("containers/order/OrderSection"), {
//   loading: () => <OrderSection />,
// });
const OrderSection = dynamic(() => import("containers/order/OrderSection"));

const orderPage = () => {
  return (
    <>
      <Navbar />
      <OrderSection />
      <FooterSection />
    </>
  );
};

// 此函数在构建时被调用
export async function getStaticProps(context) {
  return {
    props: {},
  };
}

// export default orderPage;
export default withAuth(3 * 60)(orderPage);
