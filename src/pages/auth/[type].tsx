import type { NextPage } from "next";
import { AuthPage } from "../../components";
import { PageTypes } from "../../components/authpage";
import { useRouter } from "next/router";

const SignInSignUp: NextPage = () => {
  const router = useRouter()
  const { type } = router.query
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
