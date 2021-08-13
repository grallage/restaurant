import styled from "styled-components";

export const Container = styled.section`
  padding-top: calc(${({ theme }) => theme.navbar.height} + 0px);
  background-color: white;
  /* min-height: calc(100vh - ${({ theme }) => theme.navbar.height}); */

  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  padding-bottom: ${({ theme }) => theme.navbar.height};
`;

export const GridWrapper = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;

  display: grid;
  /* grid-auto-columns: minmax(auto, 1fr); */
  grid-auto-columns: minmax(1fr, auto);
  grid-template-areas: "colImg colText";

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-areas: "colText colText" "colImg colImg";
  }
`;

// 左侧

export const GridColumnImg = styled.div`
  position: relative;
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: colImg;
  max-width: ${({ theme }) => theme.breakpoints.md};
`;

export const GridColumnImgWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: bottom;

  & img {
    object-fit: cover;
  }
`;

// 右侧

export const GridColumnText = styled.div`
  /* position: relative; */
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: colText;

  max-width: 540px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
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

export const TextContent = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 1.35rem;
  /* margin-bottom: 30px; */
`;

export const TextImageWrapper = styled.div`
  margin-top: auto;
  display: flex;
  align-items: bottom;
`;
