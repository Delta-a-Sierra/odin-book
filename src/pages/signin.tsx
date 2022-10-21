import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Signin: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });

  if (session) {
    router.push("/");
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    const { username, password } = form;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    console.log(res);
    if (res?.status === 200) {
      router.push("/");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Head>
        <title>OdinBook - signin</title>
        <meta
          name="description"
          content="Odin Book - Twitter/Facebook clone by Dwayne Sutherland"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" h-screen w-screen ">
        <aside className="hidden bg-primary"></aside>
        <div className="flex flex-col gap-4">
          <header>
            <figure>
              <img src="" />
            </figure>
          </header>
          <h1>Sign Into OdinBook</h1>
          <div className="flex gap-2 text-white">
            <button
              className="rounded-md bg-primary p-4"
              onClick={() => {
                signIn("discord");
              }}
            >
              discord
            </button>
            <button
              className="rounded-md bg-primary p-4"
              onClick={() => {
                signIn("google");
              }}
            >
              google
            </button>
            <button
              className="rounded-md bg-primary p-4"
              onClick={() => {
                signIn("facebook");
              }}
            >
              facebook
            </button>
          </div>
          <form onSubmit={handleSignin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="email"
              value={form.username}
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              onClick={handleSignin}
              className="rounded-md bg-primary p-4 text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signin;
