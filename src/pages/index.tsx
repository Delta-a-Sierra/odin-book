import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isNewUser = trpc.auth.getIsNewUser.useQuery()

  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status]);



  if (isNewUser.data === true) {
    router.push('/getstarted')
  }

  if (isNewUser.isLoading || !isNewUser.isLoading && isNewUser.data) {
    return null
  }
  if (session) {
    return (
      <>
        <Head>
          <title>Odin Book - Home</title>
          <meta
            name="description"
            content="Odin Book - Twitter/Facebook clone by Dwayne Sutherland"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>home</h1>
          {session && (
            <button
              className="rounded-md bg-primary p-4 text-white"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          )}
        </main>
      </>
    );
  };
  return null
}

export default Home;
