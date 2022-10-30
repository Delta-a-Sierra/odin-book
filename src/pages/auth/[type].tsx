import type { NextPage } from "next";
import { AuthPage } from "../../components";
import { useRouter } from "next/router";
import { useTheme } from "../../contexts/theme";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useEffect } from "react";

export enum PageTypes {
  SignUp = "Sign Up",
  SignIn = "Sign In",
}

const SignInSignUp: NextPage = () => {
  const router = useRouter()
  const { type } = router.query
  const { theme } = useTheme()

  if (!theme) {
    return null
  }

  if (type === 'signin') {
    return (
      <AuthPage pageType={PageTypes.SignIn} />
    )
  }

  return (
    <AuthPage pageType={PageTypes.SignUp} />
  )

};

export default SignInSignUp; 
