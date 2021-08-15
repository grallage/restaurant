import { Session } from "next-auth";
import { useEffect } from "react";
import useSwr, { mutate } from "swr";
import { useAxios } from "constants/AxiosConfig";
import { JwtUtils } from "./Utils";
import { signOut } from "next-auth/client";

const SESSION_URL = "/api/auth/session";

interface AuthSession extends Session {
  accessToken?: string | null;
  refreshToken?: string | null;
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
  const defaultRefreshInterval = 20;
  const { setAccessToken, setRefreshToken } = useAxios();
  const { data, error } = useSwr(SESSION_URL, fetchSession, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      mutate(SESSION_URL);
    }, (refreshInterval || defaultRefreshInterval) * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (JwtUtils.isJwtExpired(data.refreshToken as string)) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      signOut();
    } else {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    }
  }, [data?.accessToken]);

  return {
    session: data,
    loading: typeof data === "undefined" && typeof error === "undefined",
  };
}
