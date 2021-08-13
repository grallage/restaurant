import styled from "styled-components";
import { MdRestaurantMenu } from "react-icons/md";

const CARD_PADDING = "1.1REM";
const CARD_WIDTH = "30ch";

export const Container = styled.section`
  margin-bottom: 100px;
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-top: ${({ theme }) => theme.navbar.height};

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* flex-wrap: wrap;
   */
`;

export const Title = styled.h2`
  line-height: 2.8rem;
  font-size: 2rem;
  letter-spacing: 0.2ch;
  text-align: center;
`;

export const MenuWrapper = styled.div`
  margin-top: 30px;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start; */
`;

export const MenuBar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

// export const MenuIcon = styled(MdRestaurantMenu)`
//   font-size: 2rem;
//   display: inline-block;
//   color: ${({ theme }) => theme.colors.primary};
// `;

export const MenuIcon = styled(({ children, ...props }) => (
  <span {...props}>
    <MdRestaurantMenu />
    {children}
  </span>
))`
  font-size: 2rem;
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  padding-right: 2rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.6rem;
    padding: 0 0.8rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.4rem;
    padding: 0 1rem;
  }
`;

export const MenuItem = styled.li`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  padding: 0 2rem;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
    padding: 0 1.1rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

// menu body

export const MenuBody = styled.ul`
  margin-top: 30px;
  min-width: 100%;

  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: left; */
  /* &::after {
    content: "";
    flex: auto;
  } */

  /* position: relative; */

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${CARD_WIDTH}, max-content));
  grid-gap: 16px;
  justify-content: center;
  padding: initial;
`;

export const Card = styled.li`
  cursor: pointer;
  color: white;

  background-size: cover;
  padding: 7rem 0 0;
  height: 250px;
  width: ${CARD_WIDTH};
  margin: 15px 10px 0;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

  /* box-shadow: 0 6px 20px rgb(56 125 255 / 17%); */
  box-shadow: 0 3px 8px rgb(56 125 255 / 17%);

  /* 放大card特效 */
  transition: transform 500ms ease;
  &:hover,
  &:focus-within {
    transform: scale(1.05);
  }
`;

export const CardEmpty = styled.div`
  flex-grow: 1;
`;

export const CardContent = styled.div`
  padding: ${CARD_PADDING};
  height: 138px;

  background: linear-gradient(
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 0.3) 20%,
    hsl(0 0% 0% / 1)
  );

  /* 隐藏部分内容 */
  @media (hover) {
    /* transform: translateY(35%); */
    transform: translateY(62%);
    transition: transform 500ms ease;

    ${Card}:hover &, ${Card}:focus-within & {
      /* ${Card}:hover , ${Card}:focus-within { */
      transform: translateY(0);
      transition-delay: 500ms;
    }

    ${Card}:focus-within & {
      transition-duration: 0ms;
    }
  }
`;

export const CardTitle = styled.h3`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 3rem;

  /* 修饰边框 */
  /* position: relative;
  &::after {
    content: "";
    position: absolute;
    height: 4px;
    width: calc(100% + var(${CARD_PADDING}));
    background: ${({ theme }) => theme.colors.primary};
    left: calc(var(${CARD_PADDING}) * -1);
    bottom: -2px;

    transition: transform 500ms ease;
    transform-origin: left;
  } */

  ${Card}:hover &::after,
  ${Card}:focus-within &::after {
    transform: scaleX(1);
  }

  @media (hover) {
    ${CardContent} > *:not(&) {
      opacity: 0;
      transition: opacity 500ms linear;
    }

    ${Card}:hover ${CardContent}  > *:not(&),
    ${CardContent}:focus-within ${CardContent} > *:not(&) {
      opacity: 1;
      transition-delay: 200ms;
    }

    &::after {
      transform: scaleX(0);
    }
  }
`;

export const CardBody = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: rgb(255 255 255 / 0.8);
`;
