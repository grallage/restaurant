import { signIn, signOut, useSession, getProviders } from "next-auth/client";
import { useEffect, useState } from "react";

import { useAuth } from "../constants/Hooks";

export default function Home() {
  // const [session, loading] = useSession();
  const { session, loading } = useAuth();
  const [popup, setPopUp] = useState(false);

  useEffect(() => {
    async function test() {
      const providers = await getProviders();
      console.log("测试 Providers:", providers);
    }
    test();
  }, []);

  return (
    <>
      {loading && <h2>Loading...</h2>}

      {!loading && !session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>登录</button>
          <button onClick={() => setPopUp(true)}>Login</button>
          <pre>{!session && "User is not logged in"}</pre>
        </>
      )}

      {!loading && session && (
        <>
          Signed in as {session.user.email}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
          {session.accessToken && <pre>User has access token</pre>}
        </>
      )}
    </>
  );
}
