import Navbar from "containers/navbar/Navbar";
import HeroSection from "../containers/home/HeroSection";
import AboutSection from "../containers/home/AboutSection";
import MenuSection from "../containers/home/MenuSection";
import ContactSection from "../containers/home/ContactSection";
import FooterSection from "../containers/home/FooterSection";

import { useAxios } from "constants/AxiosConfig";

export default function Home({ menuList }) {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection menuList={menuList} />
      <ContactSection />
      <FooterSection />
    </>
  );
}

// 此函数在构建时被调用
export async function getStaticProps(context) {
  // 调用外部 API 获取博文列表
  const url = `${process.env.HOST}/retrieve_price_product/`;
  // const { axios } = useAxios();
  const res = await fetch(url);
  // const res = await axios({
  //   method: "get",
  //   url:url,
  // });

  const menuList = (await res.json()).dataList;

  // console.log("#### menuList:", menuList);
  // console.log("#### data:", menuList.products.data);

  // const menuList = res.data.products.data;

  // menuList.forEach((element, index) => {
  //   console.log(element);
  // });

  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      menuList,
    },
  };
}
