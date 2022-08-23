import { BlitzPage, Image, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import Navbar from "app/core/components/Navbar"
import privacyPolicy from "public/privacy-policy.png"
import * as React from "react"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

const PrivacyPolicyPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-gray-light dark:bg-gray-darkest">
        <div className="py-4 w-full text-3xl font-bold bg-gray-dark dark:bg-black/30">
          <h1 className="text-center text-black dark:text-white">Privacy Policy</h1>
          <div className="pt-1 text-sm text-center font-thin text-black/90 dark:text-white/80">
            Last updated: August 22, 2022
          </div>
        </div>
        <div id="terms-of-use-image" className="py-4">
          <Image
            src={privacyPolicy}
            alt="A picture of a window with an icon of a user and a padlock connected by an encrypted password"
            width={200}
            height={200}
          />
        </div>
        <div
          id="privacy-policy-summary"
          className="font-light max-w-3xl text-gray-darkest dark:text-white"
        >
          <p className="mx-6 mb-3">
            This privacy policy describes our policies and procedures on the collection, use and
            disclosure of your information when you use PostReview. See our{" "}
            <Link href={Routes.TermsofUsePage()}>
              <a className="underline hover:text-gray-medium">terms of use</a>
            </Link>{" "}
            for more information about the conditions of using PostReview.
          </p>
          <p className="mx-6 my-3">
            By using our service, you agree to the collection and use of information in accordance
            with this privacy policy.
          </p>
        </div>
PrivacyPolicyPage.getLayout = (page) => <Layout title="Privacy Policy | PostReview">{page}</Layout>

export default PrivacyPolicyPage
