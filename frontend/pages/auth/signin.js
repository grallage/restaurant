import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Navbar from "containers/navbar/Navbar";
import FooterSection from "containers/home/FooterSection";
import { getProviders, signIn, getCsrfToken } from "next-auth/client";
import {
  Container,
  Wrapper,
  AuthCard,
  AuthCardTitle,
  SocialAuthBox,
  SubTitle,
  Input,
  Btn,
  SocialAuthItem,
  GoogleIcon,
  GithubIcon,
  BtnGroup,
  InputGroup,
  InValidFeedback,
} from "../../components/auth/AuthElements";
import { useFormControls } from "../../components/auth/AuthFormControls";

import { notify } from "constants/Notifications";

export default function SignIn({ providers, csrfToken }) {
  const {
    formValues,
    setFormValues,
    errors,
    handleInputValue,
    handleSignupFormSubmit,
    handleSigninFormSubmit,
    formIsValid,
  } = useFormControls();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("http://localhost:3000");
      // return <div>已登录</div>;
    }
  });

  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <AuthCard>
            <AuthCardTitle>登 录</AuthCardTitle>
            <SocialAuthBox>
              {Object.values(providers)
                .filter((provider) =>
                  ["Google", "GitHub"].includes(provider.name)
                )
                .map((provider) => (
                  <SocialAuthItem
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name === "Google" && <GoogleIcon />}
                    {provider.name === "GitHub" && <GithubIcon />}
                  </SocialAuthItem>
                ))}
            </SocialAuthBox>
            <SubTitle>或使用邮箱地址登录、注册</SubTitle>

            {/* <Input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
            <InputGroup>
              <Input
                name="username"
                type="text"
                placeholder="账号"
                value={formValues.username}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                isInvalid={!!errors["username"]}
              />
              <InValidFeedback>{errors["username"]}</InValidFeedback>
            </InputGroup>

            <InputGroup>
              <Input
                name="email"
                type="email"
                placeholder="邮箱"
                value={formValues.email}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                isInvalid={!!errors["email"]}
              />
              <InValidFeedback>{errors["email"]}</InValidFeedback>
            </InputGroup>

            <InputGroup>
              <Input
                name="password"
                type="password"
                placeholder="密码"
                value={formValues.password}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                isInvalid={!!errors["password"]}
              />
              <InValidFeedback>{errors["password"]}</InValidFeedback>
            </InputGroup>

            <BtnGroup>
              <Btn
                type="button"
                onClick={handleSignupFormSubmit}
                disabled={!formIsValid()}
              >
                注册
              </Btn>
              <Btn
                type="button"
                className="opposite"
                onClick={handleSigninFormSubmit}
                disabled={!formIsValid()}
              >
                登录
              </Btn>
            </BtnGroup>
            {/* </form> */}
          </AuthCard>
        </Wrapper>
      </Container>
      <FooterSection />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
