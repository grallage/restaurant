import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Container,
  Start,
  Center,
  End,
  LogoWrapper,
  LogoText,
  LogoIcon,
  CenterItem,
  CenterItemLink,
  EndItem,
  EndItemLink,
  UserLink,
  MobileWrapper,
  MoreBtn,
  CloseBtn,
} from "components/navbar/NavbarElements";
// AUTH
import { signIn, signOut, useSession, getProviders } from "next-auth/client";
import { useRouter } from "next/router";

import { useAuth } from "../../constants/Hooks";
import { navItems } from "./data";

const Navbar = () => {
  const { session, loading } = useAuth(20 * 100);
  const { pathname } = useRouter();
  const [hideLinks, setHideLinks] = useState(true);

  // const { session, loading } = useSession();

  useEffect(() => {
    console.log("#### router:", pathname);
  }, []);

  const changeNavState = () => {
    setHideLinks(!hideLinks);
  };

  return (
    <Container onClick={changeNavState} hideLinks={hideLinks}>
      <Start>
        <LogoWrapper>
          <LogoIcon />
          <Link href="/">
            <LogoText>Lynn餐馆</LogoText>
          </Link>
        </LogoWrapper>
      </Start>
      <Center>
        {navItems.map((item, index) => {
          return (
            <CenterItem key={index}>
              <CenterItemLink
                to={`${pathname === "/" ? item.scrollTo : item.to}`}
                isIndexPage={pathname === "/"}
                onClick={changeNavState}
              >
                {item.name}
              </CenterItemLink>
            </CenterItem>
          );
        })}
      </Center>
      <End>
        <EndItem>
          <Link href="/cart">
            <EndItemLink className={`${pathname === "/cart" ? "active" : ""}`}>
              购物车
            </EndItemLink>
          </Link>
        </EndItem>
        {!loading && !session && (
          <>
            <EndItem>
              <UserLink
                onClick={() => signIn()}
                className={`${pathname === "/auth/signin" ? "active" : ""}`}
              >
                登录
              </UserLink>
            </EndItem>
          </>
        )}
        {!loading && session && (
          <>
            <Link href="/order">
              <EndItem>
                <EndItemLink
                  className={`${pathname === "/order" ? "active" : ""}`}
                >
                  历史订单
                </EndItemLink>
              </EndItem>
            </Link>
            <Link href="/user">
              <EndItem>
                <UserLink className={`${pathname === "/user" ? "active" : ""}`}>
                  {session.user.name}
                </UserLink>
              </EndItem>
            </Link>
            <EndItem>
              <UserLink
                onClick={() => {
                  localStorage.removeItem("token");
                  signOut();
                }}
              >
                退出
              </UserLink>
            </EndItem>
          </>
        )}
      </End>
      <MobileWrapper>
        {hideLinks && <MoreBtn onClick={changeNavState} />}
        {!hideLinks && <CloseBtn onClick={changeNavState} />}
      </MobileWrapper>
    </Container>
  );
};

export default Navbar;
