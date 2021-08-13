import React from "react";
import Navbar from "containers/navbar/Navbar";
import FooterSection from "containers/home/FooterSection";
import UserSection from "containers/user/UserSection";
import { withAuth } from "constants/HOCs";

const user = () => {
  return (
    <>
      <Navbar />
      <UserSection />
      <FooterSection />
    </>
  );
};

// export default user;
export default withAuth()(user);
