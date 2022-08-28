import { Image } from "blitz"
import { Field, Form, Formik, FormikValues } from "formik"
import React, { useRef } from "react"
import detectiveDarkMode from "public/detective-darkmode.png"
import detectiveLightMode from "public/detective-lightmode.png"

export const EnterName = (props) => {
  const { setCurrentPage, isDark, currentUser, setCurrentUser, changeUserInfoMutation } = props

  // Formik
  const formRef = useRef<FormikValues>()
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  return (
    <div id="enter-name-container" className="pb-20">
      <div id="title-container" className="flex flex-row items-center">
        <div className="ml-4 contrast-100 m-6 w-24">
          <Image
            src={isDark ? detectiveDarkMode : detectiveLightMode}
            alt="An image of a detective looking through a magnifying glass with their left eye"
            width={584}
            height={800}
          />
        </div>
        <h1 className="w-64 text-4xl font-bold my-4 text-gray-darkest dark:text-white">
          How do you want to be addressed?
        </h1>
      </div>
      <Formik
        innerRef={formRef as any}
        initialValues={{
          displayName: "",
          pronoun: "",
        }}
        onSubmit={(values) => {
          setCurrentUser({ ...currentUser!, ...values })
          changeUserInfoMutation({ id: currentUser.id, ...currentUser, ...values })
        }}
      >
        <Form className="flex flex-col text-xl bg-black text-white px-4">
          <div className="flex flex-row border-b border-gray-dark py-4">
            <label className="w-32">Name</label>
            <Field name="displayName" type="text" className="ml-1 bg-black outline-0 text-green" />
          </div>
          <div className="flex flex-row py-4">
            <label htmlFor="pronouns" className="w-32">
              Pronouns
            </label>
            <Field name="pronoun" type="text" className="ml-1 bg-black outline-0 text-green" />
          </div>
        </Form>
      </Formik>
      <div className="text-center">
        <button
          id="next-button"
          className="m-9 text-green text-2xl"
          type="submit"
          onClick={() => {
            handleSubmit()
            setCurrentPage("upload-photo")
          }}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}
