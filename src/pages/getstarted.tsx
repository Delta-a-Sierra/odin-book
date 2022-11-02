import { useFormik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DropDown, Input, LogoAndThemeHeader } from "../components";
import { GetStartedContainer } from "../contexts/GetStartedContainer";
import { useTheme } from "../contexts/theme";
import * as Yup from "yup";
import { Button } from "../components/button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { DateTime } from "luxon";
import { trpc } from "../utils/trpc";

const days = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type intialsType = {
  firstName: string,
  lastName: string,
  day: string,
  month: string,
  year: string,
  country: string,
  city: string
}

type dateType = {
  day: string | number
  month: string
  year: string | number
}

const intial: intialsType = { firstName: '', lastName: '', day: '', month: '', year: '', country: '', city: '' }

const validation = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  day: Yup.number().typeError('must specify number').required(),
  month: Yup.string().required(),
  year: Yup.number().typeError('must specify number').required().min(new Date().getFullYear() - 150).max(new Date().getFullYear() - 16),
  city: Yup.string().required(),
  country: Yup.string().required(),
})

const CheckDateString = ({ day, month, year }: dateType) => {
  const dateString = `${month} ${day} ${year}`;
  const invalid = DateTime.fromFormat(dateString, "LLLL dd yyyy").invalid;
  if (!invalid) {
    return true;
  }
  return false;
};

const CheckIfEighteen = ({ day, month, year }: dateType) => {
  const dateString = `${month} ${day} ${year}`;
  const dob = DateTime.fromFormat(dateString, "LLLL dd yyyy");
  const today = DateTime.now();
  if (today.minus({ years: 18 }).ts >= dob.ts) {
    return true
  }
  return false
};

// -------------- Component ---------------------------------
const GetStatedPage: NextPage = () => {
  const { theme } = useTheme();
  const [slideNumber, setSlideNumber] = useState<number>(0)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [formErrors, setFormErrors] = useState({ name: '', dob: '', location: '' })
  const updateGetstarted = trpc.user.updateGetStarted.useMutation()
  const isNewUser = trpc.auth.getIsNewUser.useQuery()
  const formik = useFormik({
    initialValues: intial,
    validationSchema: validation,
    onSubmit: (e) => {
      if (CheckDateString(e)) {
        if (CheckIfEighteen(e)) {
          const dateString = `${e.month} ${e.day} ${e.year}`;
          let dob = DateTime.fromFormat(dateString, "LLLL dd yyyy");
          updateGetstarted.mutate({ dob: dob.toISO(), name: `${e.firstName} ${e.lastName}`, city: e.city, country: e.country })
        } else {
          setFormErrors(prev => ({ ...prev, dob: 'not over 18' }))
          setSlideNumber(1)
        }
      } else {
        setFormErrors(prev => ({ ...prev, dob: 'not a valid date' }))
        setSlideNumber(1)
      }
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


  if (isNewUser.data === false) {
    router.push('/')
  }

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
      <p className={`${formErrors.name} ? 'visible' : 'hidden'} text-center text-red-500 text-sm`}>{formErrors.location}</p>
    </>
  )

  const AgeForm = (
    <>
      <div className='flex gap-x-4'>
        <DropDown
          name="day"
          onChange={formik.handleChange}
          value={formik.values.day}
          errorMsg={formik.errors.day}
          placeholder="Day"
          onBlur={formik.handleBlur}
          touched={formik.touched.day}
          content={days}
          formik={formik}
        />

        <DropDown
          name="month"
          onChange={formik.handleChange}
          value={formik.values.month}
          errorMsg={formik.errors.month}
          placeholder="Month"
          onBlur={formik.handleBlur}
          touched={formik.touched.month}
          content={months}
          formik={formik}
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
      />
      <p className={`${formErrors.dob} ? 'visible' : 'hidden'} text-center text-red-500 text-sm`}>{formErrors.dob}</p>
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
      <p className={`${formErrors.location} ? 'visible' : 'hidden'} text-center text-red-500 text-sm`}>{formErrors.location}</p>
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
        <div className={` pb-18 w-full h-full flex flex-col gap-y-8 bg-primary p-4 dark:bg-dark-800`}>
          <LogoAndThemeHeader />
          <h1 className="text-white text-center text-3xl font-open font-extrabold">Get Started</h1>
          <div className="flex-1 flex-col flex gap-y-4 items-center">
            <div className="w-full md:w-2/4 xl:w-2/5">
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
