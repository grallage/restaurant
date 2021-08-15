import React from "react";
import Navbar from "containers/navbar/Navbar";
import FooterSection from "containers/home/FooterSection";
import UserSection from "containers/user/UserSection";
import { withAuth } from "constants/HOCs";
import Head from "containers/head/Head";

const user = () => {
  return (
    <>
      <Head title="用户信息" />
      <Navbar />
      <UserSection />
      <FooterSection />
    </>
  );
};

export default withAuth()(user);
