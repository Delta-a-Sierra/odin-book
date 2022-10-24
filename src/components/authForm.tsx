import { Button } from "./button";
import { Input } from "./input";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { trpc } from "../utils/trpc";
YupPassword(Yup);

interface credentialsInterface {
  username: string;
  password: string;
}

type authFormProps = {
  type: 'Sign In' | 'Sign Up';
};

type intialsType = {
  username: string,
  password: string
  confirm?: string
}

const intialsMap = {
  'Sign In': {
    username: '',
    password: ''
  },
  'Sign Up': {
    username: '',
    password: '',
    confirm: ''
  }
}

const validationMap = {
  'Sign In': Yup.object({
    username: Yup.string().email().required(),
    password: Yup.string().password().required(),
  }),
  'Sign Up': Yup.object({
    username: Yup.string().email().required(),
    password: Yup.string().password().required(),
    confirm: Yup.string().required()
      .oneOf([Yup.ref("password")], "Passwords must match"),
  })
}

let intial: intialsType
let validation: any


export const AuthForm: React.FC<authFormProps> = ({ type }) => {
  const [error, setError] = useState<string>()
  const [credential, setCredentials] = useState<credentialsInterface>({ username: '', password: '' })
  const signUp = trpc.auth.signUp.useMutation();

  useEffect(() => {
    if (!signUp.data) {
      return
    }
    if (!signUp.data.ok) {
      setError(signUp.data.message)
      return
    }
    setError('')
    signIn('credentials', { ...credential, redirect: false })
  }, [signUp.data])

  if (type === "Sign In") {
    intial = intialsMap["Sign In"]
    validation = validationMap["Sign In"]
  } else {
    intial = intialsMap["Sign Up"]
    validation = validationMap["Sign Up"]
  }

  const formik = useFormik({
    initialValues: intial,
    validationSchema: validation,
    onSubmit: (e) => {
      handleAuth(e)
    },
  });

  const handleAuth = async (creds: credentialsInterface) => {
    try {
      if (type === 'Sign In') {
        const res = await signIn('credentials', { ...creds, redirect: false })
        if (!res?.ok) {
          setError('Invalid Login Credentials')
        }
        return
      }
      setCredentials(creds)
      signUp.mutate(creds)
    } catch {
      setError('Server Unavailable')
    }

  }


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full flex-col items-center space-y-4 pb-5 sm:w-4/6  md:w-4/5 md:gap-y-4 lg:w-4/5 xl:w-2/4"
    >
      <Input
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        errorMsg={formik.errors.username}
        onBlur={formik.handleBlur}
        touched={formik.touched.username}
        type="email"
        placeholder="Enter Email"
      />
      <Input
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        errorMsg={formik.errors.password}
        placeholder="Enter Password"
        onBlur={formik.handleBlur}
        touched={formik.touched.password}
        type="password"
      />
      {type === "Sign Up" && (
        <Input
          name="confirm"
          onChange={formik.handleChange}
          value={formik.values.confirm}
          errorMsg={formik.errors.confirm}
          placeholder="confirm Password"
          onBlur={formik.handleBlur}
          touched={formik.touched.confirm}
          type="password"
        />
      )}
      <p className={`${error ? "visible" : "hidden"} font-nunito mt-1 text-xs text-center tracking-wider text-red-500 lg:text-base xl:text-lg`}>{error}</p>
      <div className="pt-4">
        <Button
          bgColor="primary"
          onClick={formik.handleSubmit}
          textColor="white"
          text={type}
        />
      </div>
    </form >
  );
};
