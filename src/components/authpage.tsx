import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { AuthAside } from "./authaside";
import { Logo } from "./";
import { ThemeIcon } from "./themeIcon";
import { useColor } from "../hooks/useColor";
import useMediaQuery from "../hooks/useMediaQuery";

export enum PageTypes {
  SignUp = "Sign Up",
  SignIn = "Sign In",
}

type AuthPageProps = {
  pageType: PageTypes;
};

const AuthPage: NextPage<AuthPageProps> = ({ pageType }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const signUp = trpc.auth.signUp.useMutation();
  const colors = useColor();
  const isLarge = useMediaQuery("(min-width: 768px)");
  const authAsideBodies = {
    "Sign In":
      "Enter your personal details to get started on your journey with us.",
    "Sign Up":
      "Welcome Back Enter your personal details to continue your journey with us.",
  };

  if (session) {
    router.push("/");
  }

  const handleSignin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password } = form;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      console.log(res?.error);
    }
  };

  const handleSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password } = form;
    signUp.mutate({ username, password });
    console.log(signUp);
    if (!signUp.data?.ok) {
      console.log(signUp.data?.message);
      return;
    }
    handleSignin(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Head>
        <title>OdinBook - {pageType}</title>
        <meta
          name="description"
          content="Odin Book - Twitter/Facebook clone by Dwayne Sutherland"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen ">
        <AuthAside
          title={
            pageType === PageTypes.SignIn ? "Hello Friend!" : "Welcome Back!"
          }
          body={authAsideBodies[pageType]}
          buttonText={
            pageType === PageTypes.SignIn ? PageTypes.SignUp : PageTypes.SignIn
          }
        />
        <div className="flex w-full flex-col gap-4 p-8">
          <header className="relative mb-2 flex w-full items-center justify-center md:justify-start">
            <Logo width="70" />
            <div className="absolute flex w-full justify-end">
              <ThemeIcon color={colors.gray["600"]} size="2em" />
            </div>
          </header>
          <div>
            <h1>{pageType}</h1>
          </div>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4"></form>
        </div>
      </main>
    </>
  );
};

export default AuthPage;
