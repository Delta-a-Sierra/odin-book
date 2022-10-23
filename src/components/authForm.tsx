import { Button } from "./button";
import { Input } from "./input";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { PageTypes } from "./authpage";
YupPassword(Yup);

type authFormProps = {
  handleAuth: (form: { username: string; password: string; }) => Promise<void>;
  type: string;
};

export const AuthForm: React.FC<authFormProps> = ({ handleAuth, type }) => {

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
  if (type === PageTypes.SignIn) {
    intial = intialsMap[PageTypes.SignIn]
    validation = validationMap[PageTypes.SignIn]
  } else {
    intial = intialsMap[PageTypes.SignUp]
    validation = validationMap[PageTypes.SignUp]
  }


  const formik = useFormik({
    initialValues: intial,
    validationSchema: validation,
    onSubmit: (e) => {
      handleAuth(e);
    },
  });


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full flex-col items-center space-y-2 pb-5 sm:w-4/6  md:w-4/5 md:gap-y-4 lg:w-4/5 xl:w-2/4"
    >
      <Input
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        errorMsg={formik.errors.username}
        onBlur={formik.handleBlur}
        touched={formik.touched.username}
        type="username"
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
      <div className="pt-4">
        <Button
          bgColor="primary"
          onClick={formik.handleSubmit}
          textColor="white"
          text={type}
        />
      </div>
    </form>
  );
};
