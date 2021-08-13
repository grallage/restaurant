import React from "react";
import {
  Container,
  Wrapper,
  ContentWrapper,
  ContentTitle,
  ContentText,
  Line,
  CopyrightWrapper,
  CopyrightContent,
} from "../../components/footer/FooterElements";

const FooterSection = () => {
  return (
    <Container>
      <Wrapper>
        <ContentWrapper>
          <ContentTitle>营业时间</ContentTitle>
          <ContentText>9：00 - 20：00</ContentText>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>支付方式</ContentTitle>
          <ContentText>现金</ContentText>
          <ContentText>VISA</ContentText>
          <ContentText>MASTERCARD</ContentText>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>联系方式</ContentTitle>
          <ContentText>xxx街道xxx路xx号</ContentText>
          <ContentText>100-0000-0000</ContentText>
          <ContentText>lynn@demo.com</ContentText>
        </ContentWrapper>
        {/* <ContentWrapper>
          <ContentTitle>页面导航</ContentTitle>
          <ContentText>首页</ContentText>
          <ContentText>关于</ContentText>
          <ContentText>预约</ContentText>
          <ContentText>菜单</ContentText>
          <ContentText>联系</ContentText>
        </ContentWrapper> */}
        <ContentWrapper>
          <ContentTitle>社交应用</ContentTitle>
          <ContentText>Twitter</ContentText>
          <ContentText>Facebook</ContentText>
          <ContentText>Weibo</ContentText>
        </ContentWrapper>
      </Wrapper>
      <Line />
      <CopyrightWrapper>
        <CopyrightContent>© 2021 All Rights Rescrved</CopyrightContent>
      </CopyrightWrapper>
    </Container>
  );
};

export default FooterSection;
