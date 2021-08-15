import { useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "containers/navbar/Navbar";
import HeroSection from "../containers/home/HeroSection";
import AboutSection from "../containers/home/AboutSection";
import MenuSection from "../containers/home/MenuSection";
import ContactSection from "../containers/home/ContactSection";
import FooterSection from "../containers/home/FooterSection";
import { GetStaticProps } from "next";
import Head from "containers/head/Head";

export default function Home({ menuList }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`${process.env.NEXT_SERVER_HOST}`, undefined, {
      shallow: true,
    });
  }, []);

  return (
    <>
      <Head />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection menuList={menuList} />
      <ContactSection />
      <FooterSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/retrieve_price_product/`;
  const res = await fetch(url);
  const menuList = (await res.json()).dataList;
  return {
    props: {
      menuList,
    },
  };
};
