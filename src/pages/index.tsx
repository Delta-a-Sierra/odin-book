import type { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next'
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      if (!session) {
        router.push('/signin')
      }
      setSession(session)
    }
    securePage()
  }, [])

  return (
    <>
      <Head>
        <title>Odin Book - Home</title>
        <meta name="description" content="Odin Book - Twitter/Facebook clone by Dwayne Sutherland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>home</h1>
        {session &&
          <button className="rounded-md bg-primary p-4 text-white" onClick={() => { signOut() }}>Sign Out</button>
        }
      </main>
    </>
  );
};


export default Home;
