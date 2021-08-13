import React from "react";
import Image from "next/image";
import {
  Container,
  GridWrapper,
  GridColumnImg,
  GridColumnText,
  Title,
  TextContent,
  TextImageWrapper,
  GridColumnImgWrapper,
} from "../../components/about/AboutElements";
// resource
import about1Pic from "public/images/home/about1.jpg";
import about2Pic from "public/images/home/about2.jpg";

const AboutSection = () => {
  return (
    <Container id="about-page">
      <GridWrapper>
        <GridColumnImg>
          <GridColumnImgWrapper>
            <Image src={about1Pic} alt="舒适的用餐环境" />
          </GridColumnImgWrapper>
        </GridColumnImg>
        <GridColumnText>
          <Title>关于我们</Title>
          <TextContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, aut
            quia! Nemo id deleniti ipsam fuga ipsum nulla nam rerum! Id ut neque
            aperiam accusamus ab unde animi illum non!
          </TextContent>
          <TextImageWrapper>
            <Image src={about2Pic} alt="舒适的用餐环境" />
          </TextImageWrapper>
        </GridColumnText>
      </GridWrapper>
    </Container>
  );
};

export default AboutSection;
