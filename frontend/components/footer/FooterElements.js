import styled from "styled-components";

export const Container = styled.section`
  /* margin-bottom: 100px; */
  background-color: #4c4c4c;
  color: ${({ theme }) => theme.colors.light};
  /* padding-bottom: ${({ theme }) => theme.navbar.height}; */

  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: ${({ theme }) => theme.navbar.height};

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: space-around; */
  justify-content: center;

  /* @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 150px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
`;

export const ContentTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;
export const ContentText = styled.p`
  margin-top: 0.3rem;
  color: hsl(0 100% 100% / 0.7);
`;

export const Line = styled.hr`
  display: block;
  max-width: calc(1440px - 50px);
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const CopyrightWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
`;
export const CopyrightContent = styled.p`
  color: ${({ theme }) => theme.colors.light};
`;
