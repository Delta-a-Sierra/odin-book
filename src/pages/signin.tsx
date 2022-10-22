import type { NextPage } from "next";
import { AuthPage } from "../components";
import { PageTypes } from "../components/authpage";

const Signin: NextPage = () => {
  return (
    <AuthPage pageType={PageTypes.SignIn} />
  )
};

export default Signin; 
