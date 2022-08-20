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
        <div id="code-of-conduct-content">
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
          <Accordion
            className="bg-gray-dark dark:bg-black/30 text-black dark:text-white"
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography className="font-bold text-2xl">Enforcement Responsibilities</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                Community leaders are responsible for clarifying and enforcing our standards of
                acceptable behavior and will take appropriate and fair corrective action in response
                to any behavior that they deem inappropriate, threatening, offensive, or harmful.
              </p>
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                Community leaders have the right and responsibility to remove, edit, or reject
                comments, commits, code, wiki edits, issues, and other contributions that are not
                aligned to this Code of Conduct, and will communicate reasons for moderation
                decisions when appropriate.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="bg-gray-dark dark:bg-black/30 text-black dark:text-white"
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography className="font-bold text-2xl">Scope</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                This Code of Conduct applies within all community spaces, and also applies when an
                individual is officially representing the community in public spaces. Examples of
                representing our community include using an official e-mail address, posting via an
                official social media account, or acting as an appointed representative at an online
                or offline event.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="bg-gray-dark dark:bg-black/30 text-black dark:text-white"
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Typography className="font-bold text-2xl">Enforcement</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                Instances of abusive, harassing, or otherwise unacceptable behavior may be reported
                to the community leaders responsible for enforcement (listed below). All complaints
                will be reviewed and investigated promptly and fairly.
              </p>
              <div className="ml-14 my-4 font-semibold text-black dark:text-white">
                {" "}
                Anton Lebed{" "}
                <a
                  className="underline font-thin text-green hover:text-green-dark"
                  href="mailto:coglebed@gmail.com"
                >
                  (coglebed@gmail.com)
                </a>
              </div>
              <div className="ml-14 my-4 font-semibold text-black dark:text-white">
                {" "}
                Naoyuki Sunami{" "}
                <a
                  className="underline font-thin text-green hover:text-green-dark"
                  href="mailto:nsunami@pm.me"
                >
                  (nsunami@pm.me)
                </a>
              </div>
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                All community leaders are obligated to respect the privacy and security of the
                reporter of any incident. To report a Code of Conduct violation, please send an
                email to{" "}
                <a
                  className="underline font-thin text-green hover:text-green-dark"
                  href="mailto:coc@postreview.org"
                >
                  (coc@postreview.org)
                </a>{" "}
                via the
                <a
                  className="font-thin text-green hover:text-green-dark"
                  href="mailto:coc@postreview.org"
                >
                  {" "}
                  report link
                </a>
                .
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="bg-gray-dark dark:bg-black/30 text-black dark:text-white"
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
              <Typography className="font-bold text-2xl">Enforcement Guidelines</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                Community leaders will follow these Community Impact Guidelines in determining the
                consequences for any action they deem in violation of this Code of Conduct:
              </p>
              <h1 className="mx-2 mt-6 font-semibold text-black/90 dark:text-white">
                1. Correction
              </h1>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Community Impact:</h2>
              <p className="ml-5 mb-3 font-thin text-black/90 dark:text-white/90">
                Use of inappropriate language or other behavior deemed unprofessional or unwelcome
                in the community.
              </p>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Consequence:</h2>
              <p className="ml-5 mb-3 font-thin text-black/90 dark:text-white/90">
                A private, written warning from community leaders, providing clarity around the
                nature of the violation and an explanation of why the behavior was inappropriate. A
                public apology may be requested.
              </p>
              <h1 className="mx-2 mt-6 font-semibold text-black/90 dark:text-white">2. Warning</h1>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Community Impact:</h2>
              <p className="ml-5 mb-3 font-thin text-black/90 dark:text-white/90">
                A violation through a single incident or series of actions.
              </p>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Consequence:</h2>
              <p className="ml-5 mb-5 font-thin text-black/90 dark:text-white/90">
                A warning with consequences for continued behavior. No interaction with the people
                involved, including unsolicited interaction with those enforcing the Code of
                Conduct, for a specified period of time. This includes avoiding interactions in
                community spaces as well as external channels like social media. Violating these
                terms may lead to a temporary or permanent ban.
              </p>
              <h1 className="mx-2 mt-6 font-semibold text-black/90 dark:text-white">
                3. Temporary Ban
              </h1>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Community Impact:</h2>
              <p className="ml-5 mb-3 font-thin text-black/90 dark:text-white/90">
                A serious violation of community standards, including sustained inappropriate
                behavior.
              </p>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Consequence:</h2>
              <p className="ml-5 mb-5 font-thin text-black/90 dark:text-white/90">
                A temporary ban from any sort of interaction or public communication with the
                community for a specified period of time. No public or private interaction with the
                people involved, including unsolicited interaction with those enforcing the Code of
                Conduct, is allowed during this period. Violating these terms may lead to a
                permanent ban.
              </p>
              <h1 className="mx-2 mt-6 font-semibold text-black/90 dark:text-white">
                4. Permanent Ban
              </h1>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Community Impact:</h2>
              <p className="ml-5 mb-3 font-thin text-black/90 dark:text-white/90">
                Demonstrating a pattern of violation of community standards, including sustained
                inappropriate behavior, harassment of an individual, or aggression toward or
                disparagement of classes of individuals.
              </p>
              <h2 className="ml-5 font-normal text-black/90 dark:text-white">Consequence:</h2>
              <p className="ml-5 mb-3 font-thin text-black/90 dark:text-white/90">
                A permanent ban from any sort of public interaction within the community.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="bg-gray-dark dark:bg-black/30 text-black dark:text-white"
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
              <Typography className="font-bold text-2xl">Attribution</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                This Code of Conduct is adapted from the
                <a
                  className="font-thin text-green hover:text-green-dark"
                  href="https://contributor-covenant.org"
                  rel="nofollow"
                >
                  {" "}
                  Contributor Covenant
                </a>
                , version 2.1, available at{" "}
                <a
                  className="font-thin text-green hover:text-green-dark"
                  href="https://www.contributor-covenant.org/version/2/1/code_of_conduct.html"
                  rel="nofollow"
                >
                  https://www.contributor-covenant.org.version/2/1/code_of_conduct.html
                </a>
                .
              </p>
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                Community Impact Guidelines were inspired by{" "}
                <a
                  className="font-thin text-green hover:text-green-dark"
                  href="https://github.com/mozilla/diversity"
                >
                  Mozilla&apos;s code of conduct enforcement ladder
                </a>
                .
              </p>
              <p className="mx-2 my-3 text-black/90 dark:text-white/90">
                For answers to common questions about this code of conduct, see the FAQ at{" "}
                <a
                  className="font-thin text-green hover:text-green-dark"
                  href="https://www.contributor-covenant.org/faq"
                  rel="nofollow"
                >
                  https://www.contributor-covenant.org/faq
                </a>
                .
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  )
}

CodeOfConductPage.getLayout = (page) => <Layout title="Code of Conduct | PostReview">{page}</Layout>

export default CodeOfConductPage
