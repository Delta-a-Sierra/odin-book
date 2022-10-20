
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const Signin: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>OdinBook - signin</title>
        <meta name="description" content="Odin Book - Twitter/Facebook clone by Dwayne Sutherland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" w-screen h-screen ">
        <aside className="bg-primary hidden"></aside>
        <div className="flex flex-col gap-4">
          <header>
            <figure><img src="" /></figure>
          </header>
          <h1>Sign Into OdinBook</h1>
          <div className="flex gap-2 text-white">
            <button className="rounded-md bg-primary p-4" onClick={() => { signIn('discord') }}>discord</button>
            <button className="rounded-md bg-primary p-4" onClick={() => { signIn('google') }}>google</button>
            <button className="rounded-md bg-primary p-4" onClick={() => { signIn('facebook') }}>facebook</button>
          </div>
          <form className="flex flex-col gap-4">
            <input type='email' placeholder='email' />
            <input type='password' placeholder='password' />
            <button className="rounded-md bg-primary p-4 text-white" type='submit'>Sign In</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signin;
