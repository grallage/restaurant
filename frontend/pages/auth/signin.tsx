import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Navbar from "containers/navbar/Navbar";
import FooterSection from "containers/home/FooterSection";
import { getProviders, signIn } from "next-auth/client";
import Head from "containers/head/Head";
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
import { LoadingContainer } from "../../components/BasicElements";
import { useFormControls } from "../../components/auth/AuthFormControls";
import { JwtUtils } from "constants/Utils";

type Providers = typeof getProviders;
interface Props {
  providers: Providers;
}

export default function SignIn({ providers }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {
    formValues,
    errors,
    handleInputValue,
    handleSignupFormSubmit,
    handleSigninFormSubmit,
    formIsValid,
  } = useFormControls();

  useEffect(() => {
    if (
      !!localStorage.getItem("token") &&
      !JwtUtils.isJwtExpired(localStorage.getItem("token") as string)
    ) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Head title="欢迎登录、注册" />
      <Navbar />
      {loading && <LoadingContainer />}
      {!loading && (
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
      )}
      <FooterSection />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
