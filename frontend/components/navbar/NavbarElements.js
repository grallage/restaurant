import styled from "styled-components";
import { GiCook } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link as LinkScroll } from "react-scroll";
import Link from "next/link";

export const Start = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 30%;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoIcon = styled(GiCook)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;

export const LogoText = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bolder;
  font-size: 1.3rem;
  cursor: pointer;
`;

export const Center = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  justify-content: center;
  flex: 1 1 40%;

  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    position: relative;
    margin-top: 1rem;
    width: 100%;
    & li {
      display: inline-block;
      margin-bottom: 1rem;
      width: 50%;
    }
  }
`;

export const CenterItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    & a {
      padding: 0 5px;
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    & a {
      padding: 0 1rem;
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    & a {
      /* display: none; */
    }
  }
`;

// export const CenterItemLink = styled(LinkScroll)`
export const CenterItemLink = styled(
  ({ children, isIndexPage, to, ...props }) => {
    return !isIndexPage ? (
      <Link href={to}>
        <a {...props}>{children}</a>
      </Link>
    ) : (
      <LinkScroll
        smooth={true}
        duration={500}
        spy={true}
        exact="true"
        offset={-56}
        activeClass="active"
        to={to}
        {...props}
      >
        {children}
      </LinkScroll>
    );
  }
)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  padding: 0 30px;
  font-weight: bold;
  transition: color 300ms ease, border-bottom 300ms ease;
  justify-content: center;

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &.active,
    &:hover {
      border-bottom: 0;
    }
  }
`;

export const End = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  justify-content: flex-end;
  flex: 1 1 30%;

  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    position: relative;
    width: 100%;
    padding-top: 1rem;
    &:after {
      content: "";
      position: absolute;
      border: 1px solid rgba(155, 155, 155, 0.15);
      width: 100%;
      left: 0;
      top: 0;
    }
    & li {
      display: inline-block;
      margin-bottom: 1rem;
      width: 50%;
    }
  }
`;

export const EndItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    & a {
      padding: 0 5px;
      justify-content: center;
    }
  }
`;

export const EndItemLink = styled.a`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  padding: 0 10px;
  font-weight: bold;
  transition: color 300ms ease, border-bottom 300ms ease;

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }

  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &.active,
    &:hover {
      border-bottom: 0;
    }
  }
`;

export const UserLink = styled.a`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;
  padding: 0 10px;
  font-weight: bold;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &.active,
    &:hover {
      border-bottom: 0;
    }
  }
`;

export const MobileWrapper = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: none;
  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: initial;
  }
`;
export const MoreBtn = styled(FiMoreHorizontal)``;
export const CloseBtn = styled(AiOutlineClose)``;

export const Container = styled.nav`
  /* background-color: rgba(33, 33, 33, 0.98); */
  /* background: transparent; */
  background-color: rgba(255, 255, 255, 0.95);
  width: 100%;
  padding: 0 16px;
  position: fixed;
  z-index: 2021;

  height: ${({ theme }) => theme.navbar.height};
  margin-top: -${({ theme }) => theme.navbar.height};
  top: ${({ theme }) => theme.navbar.height};

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* box-shadow: 0 6px 20px rgb(56 125 255 / 17%); */
  box-shadow: 0 2px 8px rgb(56 125 255 / 17%);
  /* & > * {
    flex: 1 1 33%;
  } */

  /* 小屏幕 */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ hideLinks, theme }) =>
      hideLinks ? theme.navbar.height : "auto"};
    overflow-y: scroll;
    max-height: 100%;

    ${({ hideLinks }) =>
      hideLinks
        ? ""
        : "padding: 2rem 0 2rem;font-size: 1.5rem;flex-direction: column;"};

    & ${Center},& ${End} {
      display: ${({ hideLinks }) => (hideLinks ? "none" : "")};
      /* display: none; */
    }
  }
`;
