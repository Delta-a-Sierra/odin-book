import { useFormik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Input, LogoAndThemeHeader } from "../components";
import { GetStartedContainer } from "../contexts/GetStartedContainer";
import { useTheme } from "../contexts/theme";
import * as Yup from "yup";
import { Button } from "../components/button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type intialsType = {
  firstName: string,
  lastName: string,
  day: string,
  month: string,
  year: string,
  country: string,
  city: string
}

const intial: intialsType = { firstName: '', lastName: '', day: '', month: '', year: '', country: '', city: '' }

const validation = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  day: Yup.string().required(),
  month: Yup.string().required(),
  year: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
})


// -------------- Component ---------------------------------
const GetStatedPage: NextPage = () => {
  const { theme } = useTheme();
  const [slideNumber, setSlideNumber] = useState<number>(2)
  const router = useRouter()
  const { data: session, status } = useSession()
  const formik = useFormik({
    initialValues: intial,
    validationSchema: validation,
    onSubmit: () => {
      console.log('submit')
      // router.push('/')
    }
  })

  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status]);



  const NameForm = (
    <>
      <Input
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        errorMsg={formik.errors.firstName}
        placeholder="First Name"
        onBlur={formik.handleBlur}
        touched={formik.touched.firstName}
        type="text"
      />

      <Input
        name="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        errorMsg={formik.errors.lastName}
        placeholder="Last Name"
        onBlur={formik.handleBlur}
        touched={formik.touched.lastName}
        type="text"
      />
    </>
  )

  const AgeForm = (
    <>
      <div className='flex gap-x-4'>
        <Input
          name="day"
          onChange={formik.handleChange}
          value={formik.values.day}
          errorMsg={formik.errors.day}
          placeholder="Day"
          onBlur={formik.handleBlur}
          touched={formik.touched.day}
          type="text"
        />

        <Input
          name="month"
          onChange={formik.handleChange}
          value={formik.values.month}
          errorMsg={formik.errors.month}
          placeholder="Month"
          onBlur={formik.handleBlur}
          touched={formik.touched.month}
          type="text"
        />
      </div>
      <Input
        name="year"
        onChange={formik.handleChange}
        value={formik.values.year}
        errorMsg={formik.errors.year}
        placeholder="Year"
        onBlur={formik.handleBlur}
        touched={formik.touched.year}
        type="text"
      />
    </>
  )
  const LocationForm = (
    <>
      <Input
        name="city"
        onChange={formik.handleChange}
        value={formik.values.city}
        errorMsg={formik.errors.city}
        placeholder="City"
        onBlur={formik.handleBlur}
        touched={formik.touched.city}
        type="text"
      />

      <Input
        name="country"
        onChange={formik.handleChange}
        value={formik.values.country}
        errorMsg={formik.errors.country}
        placeholder="Country"
        onBlur={formik.handleBlur}
        touched={formik.touched.country}
        type="text"
      />
    </>
  )


  const forms = [
    { title: 'Name', content: NameForm },
    { title: 'Date of Birth', content: AgeForm },
    { title: 'Location', content: LocationForm }
  ]


  const handleSlideIncrement = () => {
    if (slideNumber === forms.length - 1) {
      formik.handleSubmit()
      setSlideNumber(0)
      return
    }
    setSlideNumber(prev => prev + 1)
  }



  if (!theme) {
    return null;
  }

  let sliderEllipses = []
  for (let i = 0; i < forms.length; i++) {
    sliderEllipses.push(<div className={`w-3 h-3 rounded-full ${slideNumber === i ? 'bg-gray-300 dark:bg-accent' : 'bg-gray-500'}`} key={`sliderEllipse-${i}`} onClick={() => { setSlideNumber(i) }} />)
  }

  return (
    <>
      <Head>
        <title>Odin Book - Home</title>
        <meta
          name="description"
          content="Odin Book - Twitter/Facebook clone by Dwayne Sutherland"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${theme} w-screen h-screen overflow-hidden`}>
        <div className={` pb-18 h-screen w-full h-full flex flex-col gap-y-8 bg-primary p-4 dark:bg-dark-800`}>
          <LogoAndThemeHeader />
          <h1 className="text-white text-center text-3xl font-open font-extrabold">Get Started</h1>
          <div className="flex-1 flex-col flex gap-y-4 items-center">
            <div className="w-3/4 md:w-2/4 xl:w-2/5">
              <GetStartedContainer title={forms[slideNumber]?.title}>
                <form className="flex flex-col gap-4 px-4 md:px-8 pt-4 pb-8">
                  {forms[slideNumber]?.content}
                </form>
              </GetStartedContainer>
            </div>
            <div className="flex gap-x-1">
              {sliderEllipses}
            </div>
            <Button bgColor={theme === 'dark' ? 'primary' : 'accent'} textColor="white" text="Next" onClick={handleSlideIncrement} />
          </div>
        </div>
      </main>
    </>
  );
};

export default GetStatedPage;
