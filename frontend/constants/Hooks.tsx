import { Session } from "next-auth";
// import { getProviders, useSession } from "next-auth/client";
import { getSession } from "next-auth/client";

import { useEffect, useState } from "react";
import useSwr, { mutate } from "swr";
import { useAxios } from "constants/AxiosConfig";

const SESSION_URL = "/api/auth/session";

interface AuthSession extends Session {
  accessToken?: string | null;
  loginType?: string | null;
}

async function fetchSession(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch session from ${url}`);
  }

  const session: AuthSession = await response.json();
  if (!session || Object.keys(session).length === 0) {
    return null;
  }
  return session;
}

export function useAuth(refreshInterval?: number) {
  /*
    custom hook that keeps the session up-to-date by refreshing it

    @param {number} refreshInterval: The refresh/polling interval in seconds. default is 20.
    @return {object} An object of the Session and boolean loading value
  */
  // const defaultRefreshInterval = 20;
  const defaultRefreshInterval = 5;
  const { data, error } = useSwr(SESSION_URL, fetchSession, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });
  // const [loginType, setLoginType] = useState("");
  let loginType = "";
  const { setAccessToken } = useAxios();

  useEffect(() => {
    let session;
    const init = async () => {
      // const session = await fetchSession(SESSION_URL);
      const session: AuthSession = await getSession();
      loginType = session?.loginType;
    };
    init();

    const intervalId = setInterval(() => {
      // if (loginType === "github") {
      //   clearInterval(intervalId);
      // } else {
      //   console.log(loginType);
      //   mutate(SESSION_URL);
      // }
      mutate(SESSION_URL);
    }, (refreshInterval || defaultRefreshInterval) * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log("data:", data.accessToken);

    setAccessToken(data.accessToken);
  }, [data?.accessToken]);

  return {
    session: data,
    loading: typeof data === "undefined" && typeof error === "undefined",
  };
}
