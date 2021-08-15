import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  GridWrapper,
  GridColumnText,
  GridColumnImg,
  Title,
  TitleRow1,
  TitleRow2,
  TitleHeightLight,
  TextContent,
  ButtonGroup,
  Button,
  GridBottom,
  Card,
  CardTitle,
  CardBody,
  LocationIcon,
  TimeIcon,
  PhoneIcon,
} from "../../components/hero/HeroElements";
// resource
import heroPic from "public/images/home/hero.png";

const HeroSection = () => {
  return (
    <Container id="hero-page">
      <GridWrapper>
        <GridColumnText>
          <div>
            <Title>
              <TitleRow1>吃厌了传统的美式？</TitleRow1>
              <TitleRow2>
                来试试我们的
                <TitleHeightLight>新作</TitleHeightLight>吧！
              </TitleRow2>
            </Title>
            <TextContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam doloribus veniam explicabo saepe provident minus esse
              libero natus quidem dolor nam consequatur distinctio, pariatur
              exercitationem. Nesciunt ut sapiente quasi sunt!
            </TextContent>
          </div>
          <ButtonGroup>
            <Link href="/cart">
              <Button>立即下单</Button>
            </Link>
          </ButtonGroup>
        </GridColumnText>

        <GridColumnImg>
          <Image src={heroPic} alt="新产品" />
        </GridColumnImg>
      </GridWrapper>
      <GridBottom>
        <Card>
          <CardTitle>
            营业时间
            <TimeIcon />
          </CardTitle>
          <CardBody>
            <p>9：00 - 20：00</p>
          </CardBody>
        </Card>
        <Card>
          <CardTitle>
            餐馆地址
            <LocationIcon />
          </CardTitle>
          <CardBody>
            <p>xxx街道xxx路xx号</p>
          </CardBody>
        </Card>
        <Card>
          <CardTitle>
            预约电话
            <PhoneIcon />
          </CardTitle>
          <CardBody>
            <p>100-0000-0000</p>
          </CardBody>
        </Card>
      </GridBottom>
    </Container>
  );
};

export default HeroSection;
