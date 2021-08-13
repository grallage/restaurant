import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";

export const Container = styled.section`
  margin-top: -${({ theme }) => theme.navbar.height};
  padding-top: calc(${({ theme }) => theme.navbar.height} + 0px);

  background-color: white;
  /* min-height: 100vh; */
`;

export const GridWrapper = styled.div`
  /* height: 100vh; */
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;

  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  grid-template-areas: "colText colImg";

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-areas: "colText colText" "colImg colImg";
  }
`;

// 左侧

export const GridColumnText = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  padding-top: 80px;
  grid-area: colText;

  max-width: ${({ theme }) => theme.breakpoints.md};
  padding-bottom: 80px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: clamp(1.8rem, -0.875rem + 4vw, 3rem);
  letter-spacing: 0.2ch;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;
export const TitleRow1 = styled.p`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 50px;
  }
`;
export const TitleRow2 = styled.p`
  margin-left: 2.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 50px;
  }
`;
export const TitleHeightLight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const TextContent = styled.p`
  margin-top: 70px;
  font-size: 1.35rem;
  margin-bottom: 30px;
`;

// 左侧-按钮
export const ButtonGroup = styled.div`
  margin-top: auto;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Button = styled.a`
  display: inline-block;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  padding: 1rem 5rem;
  background-color: black;
  border: 1px solid black;
  cursor: pointer;
  letter-spacing: 0.5ch;
  font-weight: bold;

  transition: color 300ms ease, border 300ms ease, background-color 300ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

// 右侧

export const GridColumnImg = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: colImg;
`;

// 底部

export const GridBottom = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  /* flex间隙 */
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  max-width: ${({ theme }) => theme.breakpoints.md};
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  min-width: 200px;
  min-height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;

  padding: 5px 15px;
  box-shadow: 0 6px 20px rgb(56 125 255 / 17%);

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 25px;
  }
`;

export const CardTitle = styled.p`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
`;
export const CardBody = styled.div`
  margin-top: 10px;
`;

export const LocationIcon = styled(GoLocation)`
  margin-left: 5px;
  font-size: 1rem;
`;
export const TimeIcon = styled(BiTimeFive)`
  margin-left: 5px;
  font-size: 1rem;
`;
export const PhoneIcon = styled(AiOutlinePhone)`
  margin-left: 5px;
  font-size: 1rem;
`;
