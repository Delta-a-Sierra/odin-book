import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { AuthAside } from "./authaside";
import { Logo, FloatLink, SocialIcon } from "./";
import { ThemeIcon } from "./themeIcon";
import { useColor } from "../hooks/useColor";
import { useTheme } from "../contexts/theme";
import { AuthForm } from "./authForm";
import { useEffect, useState } from "react";

type AuthPageProps = {
  pageType: 'Sign Up' | 'Sign In';
};

interface credentials {
  username: string,
  password: string
}

const AuthPage: NextPage<AuthPageProps> = ({ pageType }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const signUp = trpc.auth.signUp.useMutation();
  const [credentials, setCredentials] = useState<credentials>({ username: '', password: '' })
  const colors = useColor(); // tailwind colors

  const {
    state: { dark },
  } = useTheme();

  const authAsideBodies = {
    "Sign In":
      "Enter your personal details to get started on your journey with us.",
    "Sign Up":
      "Welcome Back Enter your personal details to continue your journey with us.",
  };

  // Redirects if authenticated
  if (session) {
    router.push("/");
  }

  // Automatically Signs in after SignUp
  useEffect(() => {
    if (signUp.data?.ok) {
      handleSignin(credentials)
    }
  }, [signUp, credentials])

  const handleSignin = async (form: credentials) => {
    const { username, password } = form;
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  };

  const handleSignUp = (form: credentials) => {
    const { username, password } = form;
    setCredentials({ username, password })
    signUp.mutate({ username, password })
  }

  const handleOauth = async (provider: 'facebook' | 'discord' | 'google') => {
    await signIn(provider)
  }

  const handleRedirect = () => {
    if (pageType === 'Sign In') {
      router.push('/auth/signup')
      return
    }
    router.push('/auth/signin')
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
            pageType === "Sign In" ? "Hello Friend!" : "Welcome Back!"
          }
          body={authAsideBodies[pageType]}
          buttonText={
            pageType === "Sign In" ? "Sign Up" : "Sign In"
          }
          buttonOnClick={handleRedirect}
        />
        <div className="flex flex-1 flex-col justify-between  py-4 px-10 dark:bg-dark-800 sm:px-8 md:py-4 ">
          <header className="relative my-4 flex w-full items-center justify-center md:justify-start">
            <Logo width="70" />
            <div className="absolute flex w-full justify-end">
              <ThemeIcon color={colors.gray["400"]} size="1.5em" />
            </div>
          </header>
          <div className="justifiy-center flex  flex-col items-center">
            <div className="mb-8">
              <h1 className="font-open mb-4 text-center text-3xl font-extrabold text-primary dark:text-gray-200  md:text-3xl lg:text-5xl">
                {pageType}
              </h1>
              <div className="flex gap-3">
                <SocialIcon type='google' onClick={() => { handleOauth('google') }} />
                <SocialIcon type='facebook' onClick={() => { handleOauth('facebook') }} />
                <SocialIcon type='discord' onClick={() => { handleOauth('discord') }} />
              </div>
            </div>
            <AuthForm type={pageType} handleAuth={pageType === "Sign In" ? handleSignin : handleSignUp} />
            <div className="mt-6 md:hidden">
              <FloatLink size="sm" center />
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </>
  )
};

export default AuthPage;
