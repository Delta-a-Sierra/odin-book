import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthAside } from "./authaside";
import { FloatLink, SocialIcon, LogoAndThemeHeader } from "./";
import { useTheme } from "../contexts/theme";
import { AuthForm } from "./authForm";

type AuthPageProps = {
  pageType: "Sign Up" | "Sign In";
};

const AuthPage: NextPage<AuthPageProps> = ({ pageType }) => {
  const router = useRouter();
  const { data: session } = useSession()
  const { theme } = useTheme();
  // Redirects if authenticated

  if (session) {
    router.push("/")
  }

  const authAsideBodies = {
    "Sign In":
      "Enter your personal details to get started on your journey with us.",
    "Sign Up":
      "Welcome Back Enter your personal details to continue your journey with us.",
  };

  const linkText = {
    "Sign In": "Don't have a account?",
    "Sign Up": "Already have an account?",
  };


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
      <main
        className={`max-w-screen flex h-screen max-h-screen w-screen overflow-hidden ${theme === "dark" && "dark"
          }`}
      >
        <AuthAside
          title={pageType === "Sign In" ? "Hello Friend!" : "Welcome Back!"}
          body={authAsideBodies[pageType]}
          buttonText={pageType === "Sign In" ? "Sign Up" : "Sign In"}
          buttonOnClick={handleRedirect}
        />
        <div className="flex flex-1 flex-col justify-between  py-4 px-10 dark:bg-dark-800 sm:px-8 md:py-4 ">
          <LogoAndThemeHeader />
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
            <AuthForm type={pageType} />
            <div className="mt-6 md:hidden">
              <FloatLink
                href={pageType === "Sign In" ? "/auth/signup" : "/auth/signin"}
                text={linkText[pageType]}
                size="sm"
                center
              />
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default AuthPage;
