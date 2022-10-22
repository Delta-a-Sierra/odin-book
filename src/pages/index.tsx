import type { NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, []);

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

export default Home;
