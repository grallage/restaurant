import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

const ICON_FONTSIZE = "1.3rem";

export const Container = styled.section`
  padding-top: calc(${({ theme }) => theme.navbar.height} + 0px);
  background-color: ${({ theme }) => theme.colors.light};
  /* min-height: 100vh; */
  min-height: 800px;
  padding-bottom: 100px;
`;

export const GridWrapper = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  /* height: 100%; */

  display: grid;
  /* grid-auto-columns: minmax(auto, 1fr); */
  grid-auto-columns: minmax(1fr, auto);
  grid-template-areas: "colImg colImg colImg colText";

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-areas: "colText colText" "colImg colImg";
  }
`;

// 左侧

export const GridColumnImg = styled.div`
  /* position: relative; */
  margin-bottom: 15px;
  padding: 0 30px;
  grid-area: colImg;
  /* max-width: ${({ theme }) => theme.breakpoints.md}; */
  /* flex: 1; */
`;

// 右侧

export const GridColumnText = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  padding-top: 50px;
  grid-area: colText;

  padding-bottom: 80px;
  max-width: 540px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  line-height: 2.8rem;
  font-size: 2rem;
  letter-spacing: 0.2ch;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
    display: inline-block;
    width: 100%;
  }
`;
export const TextWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

export const TextContent = styled.p`
  margin-top: 15px;
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: ${({ theme }) => theme.colors.primary};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

export const LocationIcon = styled(GoLocation)`
  margin-right: 5px;
  font-size: ${ICON_FONTSIZE};
`;
export const TimeIcon = styled(BiTimeFive)`
  margin-right: 5px;
  font-size: ${ICON_FONTSIZE};
`;
export const PhoneIcon = styled(AiOutlinePhone)`
  margin-right: 5px;
  font-size: ${ICON_FONTSIZE};
`;
export const EmailIcon = styled(AiOutlineMail)`
  margin-right: 5px;
  font-size: ${ICON_FONTSIZE};
`;
