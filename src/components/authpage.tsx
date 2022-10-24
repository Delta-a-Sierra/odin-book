import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthAside } from "./authaside";
import { Logo, FloatLink, SocialIcon } from "./";
import { ThemeIcon } from "./themeIcon";
import { useColor } from "../hooks/useColor";
import { useTheme } from "../contexts/theme";
import { AuthForm } from "./authForm";

type AuthPageProps = {
  pageType: "Sign Up" | "Sign In";
};

const AuthPage: NextPage<AuthPageProps> = ({ pageType }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const colors = useColor(); // tailwind colors

  const { theme } = useTheme();

  const authAsideBodies = {
    "Sign In":
      "Enter your personal details to get started on your journey with us.",
    "Sign Up":
      "Welcome Back Enter your personal details to continue your journey with us.",
  };

  const linkText = {
    "Sign In": "Don't have a account?",
    "Sign Up": "Already have an account?"
  };

  // Redirects if authenticated
  if (session) {
    router.push("/");
  }

  const handleOauth = async (provider: "facebook" | "discord" | "google") => {
    await signIn(provider);
  };

  const handleRedirect = () => {
    if (pageType === "Sign In") {
      router.push("/auth/signup");
      return;
    }
    router.push("/auth/signin");
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
      <main className={`flex h-screen w-screen ${theme === 'dark' && "dark"} `}>
        <AuthAside
          title={pageType === "Sign In" ? "Hello Friend!" : "Welcome Back!"}
          body={authAsideBodies[pageType]}
          buttonText={pageType === "Sign In" ? "Sign Up" : "Sign In"}
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
                <SocialIcon
                  type="google"
                  onClick={() => {
                    handleOauth("google");
                  }}
                />
                <SocialIcon
                  type="facebook"
                  onClick={() => {
                    handleOauth("facebook");
                  }}
                />
                <SocialIcon
                  type="discord"
                  onClick={() => {
                    handleOauth("discord");
                  }}
                />
              </div>
            </div>
            <AuthForm
              type={pageType}
            />
            <div className="mt-6 md:hidden">
              <FloatLink href={pageType === 'Sign In' ? "/auth/signup" : "/auth/signin"} text={linkText[pageType]} size="sm" center />
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default AuthPage;
