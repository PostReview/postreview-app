import { BlitzPage, Image, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import Navbar from "app/core/components/Navbar"
import termsOfUse from "public/terms-of-use.png"
import * as React from "react"
import { alpha, styled } from "@mui/material/styles"
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

const accordionStyle = {
  "@media (prefers-color-scheme: light)": {
    background: "#545454",
    color: "#000000",
    fontWeight: "bold",
  },
  "@media (prefers-color-scheme: dark)": {
    background: alpha("#000000", 0.3),
    color: "#ffffff",
    fontWeight: "bold",
  },
}

const TermsofUsePage: BlitzPage = () => {
  // Track the state of individual accordion
  const [accordion, setAccordion] = React.useState({
    scope: false,
    definitions: false,
    agreement: false,
    functions: false,
    term: false,
    availability: false,
    data: false,
    change: false,
    law: false,
    contact: false,
    acknowledgement: false,
  })

  // Handle click for each accordion
  const handleClick = (key: string) => {
    setAccordion({ ...accordion, [key]: !accordion[key] })
  }
  // Track the expand all button
  const [expandClicked, setExpandClicked] = React.useState(false)
  // Handle expand all accordions
  const handleExpandAll = (expand = true) => {
    Object.keys(accordion).forEach((key) => {
      if (expand) return (accordion[key] = true)
      if (!expand) return (accordion[key] = false)
    })
    setAccordion({ ...accordion })
    setExpandClicked(!expandClicked)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-gray-light dark:bg-gray-darkest">
        <div className="py-4 w-full text-3xl font-bold bg-gray-dark dark:bg-black/30">
          <h1 className="text-center text-black dark:text-white">Terms of Use</h1>
        </div>
        <div id="terms-of-use-image" className="py-4">
          <Image
            src={termsOfUse}
            alt="An image of a paper with a checkmark on the bottom right"
            width={200}
            height={200}
          />
        </div>
        <div className="self-end">
          <button
            className="px-2 py-1 mx-3 my-2 text-sm bg-gray-medium text-gray-light"
            onClick={() => handleExpandAll(!expandClicked)}
          >
            {expandClicked ? "Collapse" : "Expand All"}
          </button>
        </div>
        <div id="terms-of-use-content" className="max-w-3xl">
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.scope}
            onClick={() => handleClick("scope")}
          >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography variant="h5">Scope</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 font-thin text-black/90 dark:text-white/90">
                PostReview Team (&quot;we&quot; or &quot;us&quot;) provides an online reviewing
                where people can post reviews to scholarly outputs. The platform is available at{" "}
                <a
                  className="font-thin underline text-green hover:text-green-dark"
                  href="https://postreview.org"
                >
                  https://postreview.org/
                </a>{" "}
                (thereafter referred to as &quot;PostReview&quot;).
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.definitions}
            onClick={() => handleClick("definitions")}
          >
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography variant="h5">Definitions</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4  font-thin list-decimal">
                <li className="m-2">
                  &quot;User&quot;: A natural person that registers and uses PostReview
                </li>
                <li className="m-2">
                  &quot;User Account&quot; or &quot;Account&quot;: The personal account registered
                  to PostReview
                </li>
                <li className="m-2">
                  &quot;Content&quot;: Any type of information that a user uploads to PostReview
                </li>
                <li className="m-2">
                  &quot;Review&quot;: An evaluation of a scholarly output posted by a user. They
                  take forms of numeric ratings or verbal comments.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.agreement}
            onClick={() => handleClick("agreement")}
          >
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography variant="h5">
                Agreement to the terms and registering an account
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  The user has to open a user account to post reviews on PostReview.
                </li>
                <li className="m-2">
                  To create a user account, the user has to go to PostReview to sign up. The user
                  has to be at least 18 years old and in full legal capacity to open a user account.
                </li>
                <li className="m-2">
                  During the sign-up process, the user has to provide basic information, including
                  an email address, a handle, and a password. The user has an option to sign up
                  using a third-party provider (e.g., Google). In that case, the user warrants that
                  they are entitled to grand us access to their information (e.g., email), without
                  branching any of the terms and conditions in their third-party account.
                </li>
                <li className="m-2">
                  We reserve the right to remove, reclaim, or change a username if we determine, in
                  our sole discretion, that such username is inappropriate, obscene, or otherwise
                  objectionable.
                </li>
                <li className="m-2">
                  By clicking the &quot;Sign up&quot; button, the user is asking to create an
                  account on PostReview. Then, we will send an email with an offer to open the
                  account and to confirm the user&apos;s email address. Once the user clicks the
                  email to confirm their email, the user will accept the offer and concludes the
                  contract with us.
                </li>
                <li className="m-2">
                  We ask the user to keep their account information, especially the password, secure
                  and confidential. We also ask the user not to share it to any third party.
                </li>
                <li className="m-2">
                  The use can access these terms anytime on PostReview. The agreement is concluded
                  in English and the terms are available in English.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.functions}
            onClick={() => handleClick("functions")}
          >
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Typography variant="h5">Basic functions and rules of PostReview</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  The PostReview platform provides basic functions to all users with a user account.
                  The user can search scholarly articles, browse other users&apos; reviews, and
                  submit their own reviews. We make no guarantees about the availability of
                  PostReview.
                </li>
                <li className="m-2">
                  The user ensures complies to the basic rules of PostReview at any time. On
                  PostReview, it&apos;s forbidden:
                </li>
                <ul className="mx-8 my-4 font-thin list-disc">
                  <li className="m-2">
                    To post and distribute insulting, abusive, offensive, racist, threatening, youth
                    protection law infringing, pornographic, personal rights infringing, promoting
                    violence or sedition, inciting criminal acts, providing instructions on how to
                    commit criminal acts or services that involve pornographic and/or erotic content
                    or any other illegal content;
                  </li>
                  <li className="m-2">
                    To upload and distribute content that has been copied, in whole or in any part,
                    from any other protected work or material without the permission of the
                    respective copyright owner;
                  </li>
                  <li className="m-2">
                    To upload and distribute content that affects or infringes the rights of any
                    third party, in particular personal rights, copyrights or other intellectual
                    property rights or any other third-party rights;
                  </li>
                  <li className="m-2">
                    To upload and distribute Content that contains personal, confidential or
                    non-public information;
                  </li>
                  <li className="m-2">
                    To contact other PostReview users in a not respectful and impolite manner, as
                    well as to buy or sell any products or services;
                  </li>
                  <li className="m-2">
                    To provide wrong data or information, and to provide data or information of any
                    third party; or
                  </li>
                  <li className="m-2">
                    To sell or otherwise transfer the User Account to another person.
                  </li>
                </ul>
                <li className="m-2">
                  We may accept, reject, or remove reviews in our sole discretion. We have no
                  obligation to screen reviews or to delete reviews, even if anyone considers
                  reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not
                  necessarily represent our opinions or the views of our affiliates or partners. We
                  do not assume liability for any review or for any claims, liabilities, or losses
                  resulting from any review.
                </li>
                <li className="m-2">
                  By posting a review, the user grants their content the Creative Commons
                  Attribution License (CC BY 4.0). In addition, a user grants to us a perpetual,
                  non-exclusive, worldwide, royalty-free, fully-paid, assignable, and sub-licensable
                  right and license to reproduce, modify, translate, transmit by any means, display,
                  perform, and/or distribute all content relating to reviews.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.term}
            onClick={() => handleClick("term")}
          >
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
              <Typography variant="h5">Term and termination</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  The term of this agreement commences with the user&apos;s registration. Both
                  parties can terminate the agreement with effect at the end of each month by
                  sending a termination notice, in written form, such as email. The user can delete
                  their account at any time.
                </li>
                <li className="m-2">
                  The right of both parties to terminate this agreement for good cause shall remain
                  unaffected.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.availability}
            onClick={() => handleClick("availability")}
          >
            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
              <Typography variant="h5">Availability and maintenance</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                We will carry out maintenance to ensure that PostReview works well for the users.
                While we work on maintenance, PostReview may not be available or functional during
                use. We cannot guarantee the uninterrupted availability of the platform.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.data}
            onClick={() => handleClick("data")}
          >
            <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
              <Typography variant="h5">Protecting data</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                The user agrees that we shall have no liability for any loss or corruption of data,
                and the user hereby waives any right of action against us arising from any such loss
                or corruption of data. Please see our Privacy Policy for more details.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.change}
            onClick={() => handleClick("change")}
          >
            <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
              <Typography variant="h5">Changes to the terms</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  We reserve the right to introduce new changes to PostReview and corresponding
                  rules to the terms. If the user does not object in writing form (e.g., email)
                  within a period of two weeks from the date of announcement, we assume that the
                  user agrees to the changes.
                </li>
                <li className="m-2">
                  We will inform the user about the right to object, how to object, and what happens
                  when they object to the changes. If the user objects to the changes, the
                  contractual relationship shall continue under the most recent version of the Terms
                  before the change. In such case, we reserve the right to terminate the contractual
                  relationship.
                </li>
                <li className="m-2">
                  Otherwise, a change of the terms of use is possible at any time with the consent
                  of the user.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.law}
            onClick={() => handleClick("law")}
          >
            <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
              <Typography variant="h5">Governing law</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                These terms and the use of PostReview are governed by and construed in accordance
                with the laws of the State of Delaware applicable to agreements made and to be
                entirely performed within the State of Delaware, without regard to its conflict of
                law principles.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.contact}
            onClick={() => handleClick("contact")}
          >
            <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
              <Typography variant="h5">Contact</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                To resolve a complaint regarding PostReview or to receive further information
                regarding its use, please contact us at{" "}
                <a
                  className="font-thin underline text-green hover:text-green-dark"
                  href="mailto:info@postreview.org"
                >
                  {" "}
                  info@postreview.org
                </a>
                .
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ ...accordionStyle }}
            expanded={accordion.acknowledgement}
            onClick={() => handleClick("acknowledgement")}
          >
            <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
              <Typography variant="h5">Acknowledgement</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-medium dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                In writing this terms of use, we referred to the Terms of Use by
                <Link href="https://www.researchequals.com/terms">
                  <a
                    className="font-thin text-green hover:text-green-dark"
                    target="_blank"
                    rel="nofollow"
                  >
                    {" "}
                    ResearchEquals
                  </a>
                </Link>
                .
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </main>
    </div>
  )
}

TermsofUsePage.getLayout = (page) => <Layout title="Terms of Use | PostReview">{page}</Layout>

export default TermsofUsePage
