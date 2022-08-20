import { BlitzPage, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import codeOfConduct from "public/code-of-conduct.png"
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

const CodeOfConductPage: BlitzPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1")

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-gray-light dark:bg-gray-darkest">
        <div className="py-4 w-full text-3xl font-bold bg-gray-dark dark:bg-black/30">
          <h1 className="text-center text-black dark:text-white">Code of Conduct</h1>
        </div>
        <div id="code-of-conduct-image" className="py-4 brightness-200">
          <Image
            src={codeOfConduct}
            alt="A picture of two peoples' hands holding a balanced scale together"
            width={200}
            height={200}
          />
        </div>
        <div id="our-pledge-header" className="flex flex-col justify-start">
          <div className="text-2xl font-semibold text-black dark:text-white">Our Pledge</div>
        </div>
        <div id="our-pledge-body" className="font-light text-gray-darkest dark:text-white">
          <p className="mx-6 my-3">
            We as members, contributors, and leaders pledge to make participation in our community a
            harassment-free experience for everyone, regardless of age, body size, visible or
            invisible disability, ethnicity, sex characteristics, gender identity and expression,
            level of experience, education, socio-economic status, nationality, personal appearance,
            race, caste, color, religion, or sexual identity and orientation.
          </p>
          <p className="mx-6 mb-3">
            We pledge to act and interact in ways that contribute to an open, welcoming, diverse,
            inclusive, and healthy community.
          </p>
        </div>
          <Accordion
            className="bg-gray-dark dark:bg-black/30 text-black dark:text-white"
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography className="font-bold text-2xl">Our Standards</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 font-semibold text-black/90 dark:text-white">
                Examples of behavior that contributes to a positive environment for our community
                include:
              </p>
              <ul className="mx-8 my-4 list-disc">
                <li className="m-2">Demonstrating empathy and kindness toward other people</li>
                <li className="m-2">
                  Being respectful of differing opinions, viewpoints, and experiences
                </li>
                <li className="m-2">Giving and gracefully accepting constructive feedback</li>
                <li className="m-2">
                  Accepting responsibility and apologizing to those affected by our mistakes, and
                  learning from the experience
                </li>
                <li className="m-2">
                  Focusing on what is best not just for us as individuals, but for the overall
                  community
                </li>
              </ul>
              <p className="mx-2 font-semibold text-black/90 dark:text-white">
                Examples of unacceptable behavior include:
              </p>
              <ul className="mx-8 my-4 list-disc">
                <li className="m-2">
                  The use of sexualized language or imagery, and sexual attention or advances of any
                  kind
                </li>
                <li className="m-2">
                  Trolling, insulting or derogatory comments, and personal or political attacks
                </li>
                <li className="m-2">Public or private harassment</li>
                <li className="m-2">
                  Publishing others&amp; private information, such as a physical or email address,
                  without their explicit permission
                </li>
                <li className="m-2">
                  Other conduct which could reasonably be considered inappropriate in a professional
                  setting
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
            </AccordionDetails>
          </Accordion>
            </AccordionDetails>
          </Accordion>
CodeOfConductPage.getLayout = (page) => <Layout title="Code of Conduct | PostReview">{page}</Layout>

export default CodeOfConductPage
