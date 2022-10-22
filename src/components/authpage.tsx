import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { AuthAside } from "./authaside";
import { Logo } from "./";
import { ThemeIcon } from "./themeIcon";
import { useColor } from "../hooks/useColor";
import { useTheme } from "../contexts/theme";
import { AuthForm } from "./authForm";
import { useEffect, useState } from "react";

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
  const signUp = trpc.auth.signUp.useMutation();
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const colors = useColor();
  const {
    state: { dark },
  } = useTheme();
  const authAsideBodies = {
    "Sign In":
      "Enter your personal details to get started on your journey with us.",
    "Sign Up":
      "Welcome Back Enter your personal details to continue your journey with us.",
  };


  if (session) {
    router.push("/");
  }

  useEffect(() => {
    if (signUp.data?.ok) {
      handleSignin(credentials)
    }
  }, [signUp, credentials])

  const handleSignin = async (form: { username: string, password: string }) => {
    const { username, password } = form;
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  };

  const handleSignUp = async (form: { username: string, password: string }) => {
    const { username, password } = form;
    setCredentials({ username, password })
    signUp.mutate({ username, password })
  }

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
      <main className={`flex h-screen w-screen ${dark && "dark"} `}>
        <AuthAside
          title={
            pageType === PageTypes.SignIn ? "Hello Friend!" : "Welcome Back!"
          }
          body={authAsideBodies[pageType]}
          buttonText={
            pageType === PageTypes.SignIn ? PageTypes.SignUp : PageTypes.SignIn
          }
        />
        <div className="flex flex-1 flex-col justify-between gap-1 py-4 px-10 dark:bg-dark-800 sm:px-8 md:py-4 ">
          <header className="relative mb-2 flex w-full items-center justify-center md:justify-start">
            <Logo width="70" />
            <div className="absolute flex w-full justify-end">
              <ThemeIcon color={colors.gray["600"]} size="2em" />
            </div>
          </header>
          <div className="justifiy-center flex  flex-col items-center">
            <h1 className="font-open text-center text-2xl font-extrabold text-primary dark:text-gray-200 md:text-3xl lg:text-5xl">
              {pageType}
            </h1>
            <AuthForm type={pageType} handleAuth={pageType === PageTypes.SignIn ? handleSignin : handleSignUp} />
          </div>
          <p>end</p>
        </div>
      </main>
    </>
  )
};

export default AuthPage;
