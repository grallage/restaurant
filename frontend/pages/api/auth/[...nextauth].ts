import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { signIn } from "next-auth/client";
import Providers from "next-auth/providers";
import axios from "axios";
// import FormData from "form-data";
// import { AuthenticatedUser } from "../../../types";
import { JwtUtils, UrlUtils } from "../../../constants/Utils";
import { getCsrfToken } from "next-auth/client";

const debug = false;

namespace NextAuthUtils {
  export const refreshToken = async function (refreshToken) {
    try {
      const response = await axios.post(
        `${process.env.HOST}/api/auth/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const { access, refresh } = response.data;
      // still within this block, return true
      return [access, refresh];
    } catch {
      return [null, null];
    }
  };
}

const settings: NextAuthOptions = {
  debug: false,
  // debug: process.env.NODE_ENV === "development",
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // secret: process.env.JWT_SECRET,
    secret: "sji#8ddl",
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "测试1",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "账号名", type: "text", placeholder: "" },
        email: { label: "邮箱地址", type: "email", placeholder: "" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials, req) {
        // axios.defaults.xsrfCookieName = "csrftoken";
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.withCredentials = true;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        // let form = new FormData();
        // form.append("username", "t4");
        // form.append("email", "t4@t.com");
        // form.append("password", "111111");

        console.log("发送登录");

        const response = await axios.post(
          `${process.env.HOST}/dj-rest-auth/login/`,
          {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("登录：");
        console.log(response.data);

        if (response?.data?.user) {
          // const user = { id: 1, name: "用户A", email: "测试@example.com" };
          const { user, access_token, refresh_token } = response.data;
          user.accessToken = access_token;
          user.refreshtoken = refresh_token;
          user.name = user.username;
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log("触发 signIn 回调：", account.provider);
      if (debug) {
        console.log("user:", user);
        console.log("account:", account);
        console.log("profile:", profile);
      }
      return true;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (debug) {
        console.log("触发 jwt 回调：");
        console.log("token:", token);
        console.log("user:", user);
        // console.log("account:", account);
        // console.log("profile:", profile);
        // console.log("isNewUser:", isNewUser);
      }
      if (user) {
        if (account.provider === "google") {
          const { accessToken, idToken } = account;
          // make a POST request to the DRF backend
          try {
            const response = await axios.post(
              // tip: use a seperate .ts file or json file to store such URL endpoints
              // "http://127.0.0.1:8000/api/social/login/google/",
              `${process.env.HOST}/api/social/login/google/`,

              {
                access_token: accessToken, // note the differences in key and value variable names
                id_token: idToken,
              }
            );

            // extract the returned token from the DRF backend and add it to the `user` object
            const { access_token, refresh_token } = response.data;
            // reform the `token` object from the access token we appended to the `user` object
            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
              loginType: "google",
            };

            return token;
          } catch (error) {
            return null;
          }
        } else if (account.provider === "github") {
          const { accessToken } = account;
          console.log("accessToken:", accessToken);
          try {
            console.log("发送到服务器:");
            const response = await axios.post(
              `${process.env.HOST}/api/social/login/github/`,
              { access_token: accessToken }
            );

            const { access_token } = response.data;
            console.log("access_token", access_token);
            // user.accessToken = access_token;

            token = {
              ...token,
              accessToken: access_token,
              loginType: "github",
            };

            return token;
          } catch (error) {
            console.log("请求出错");
            // console.log(error);
            return null;
          }
        } else {
          const { accessToken } = user;
          token.accessToken = accessToken;
        }
      }
      // if (user) end

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if (
        token?.refreshToken &&
        JwtUtils.isJwtExpired(token.accessToken as string)
      ) {
        console.log("jwt到期");
        const [newAccessToken, newRefreshToken] =
          await NextAuthUtils.refreshToken(token.refreshToken);

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };

          return token;
        }

        // unable to refresh tokens from DRF backend, invalidate the token
        return {
          ...token,
          exp: 0,
        };
      }

      return token;
    },
    async session(session, user) {
      if (debug) {
        console.log("触发 session 回调：");
        console.log("session", session);
        console.log("user:", user);
      }
      session.accessToken = user.accessToken;
      session.loginType = user.loginType;
      return session;
    },
  },
  theme: "light",
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, settings);
