import { Session } from "next-auth";

import React from "react";
import { useAuth } from "./Hooks";
import { useRouter } from "next/router";

type TSessionProps = {
  session: Session;
};

export function withAuth<P extends object>(refreshInterval?: number) {
  /*
    @param { number } refreshInterval: number of seconds before each refresh
  */
  return function (Component: React.ComponentType<P>) {
    return function (props: Exclude<P, TSessionProps>) {
      const { session, loading } = useAuth(refreshInterval);
      const router = useRouter();

      if (typeof window !== undefined && loading) {
        return null;
      }

      if (!!!localStorage.getItem("token")) {
        // router.push(`${process.env.NEXTAUTH_URL}`);
        router.push("/auth/signin");
        return <div>请登录</div>;
      } else {
        return <Component session={session} {...props} />;
      }

      // if (!loading && !session) {
      //   router.push(`${process.env.NEXTAUTH_URL}`);
      // }

      // return <Component session={session} {...props} />;
    };
  };
}
