import { BlitzPage, Image, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import Navbar from "app/core/components/Navbar"
import privacyPolicy from "public/privacy-policy.png"
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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1rem", color: "#2e2c2c" }} />}
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
    background: "#737373",
    color: "#000000",
    fontWeight: "bold",
  },
  "@media (prefers-color-scheme: dark)": {
    background: alpha("#000000", 0.6),
    color: "#ffffff",
    fontWeight: "bold",
  },
}

const PrivacyPolicyPage: BlitzPage = () => {
  // Track the state of individual accordion
  const [accordion, setAccordion] = React.useState({
    definitions: false,
    personal: false,
    usage: false,
    cookies: false,
    purposes: false,
    share: false,
    retention: false,
    transfer: false,
    disclosure: false,
    security: false,
    changes: false,
    contact: false,
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
      <Navbar />
      <main className="flex-grow flex flex-col items-center bg-gray-light dark:bg-gray-darkest">
        <div className="py-4 w-full text-3xl font-bold bg-gray-medium dark:bg-black/60">
          <h1 className="text-center bg-gray-medium dark:bg-black/0 text-black dark:text-white">
            Privacy Policy
          </h1>
          <div className="pt-1 text-sm text-center bg-gray-medium dark:bg-black/0 text-black/70 dark:text-white/70">
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
          className="font-light max-w-3xl text-black dark:text-white"
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
        <div id="terms-of-use-content" className="max-w-3xl">
          <div className="text-right">
            <button
              className="px-2 py-1 mx-3 my-2 text-sm font-semibold bg-gray-dark/40 dark:bg-black/40 text-black dark:text-white"
              onClick={() => handleExpandAll(!expandClicked)}
            >
              {expandClicked ? "Collapse" : "Expand All"}
            </button>
          </div>

          <Accordion sx={{ ...accordionStyle }} expanded={accordion.definitions}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              onClick={() => handleClick("definitions")}
            >
              <Typography variant="h5" fontWeight="bold">
                Definitions
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  Account: A unique account created for the user to access PostReview
                </li>
                <li className="m-2">
                  Company (referred to as either &quot;the company&quot;, &quot;we&quot;,
                  &quot;us&quot; or &quot;our&quot; in this agreement) refers to PostReview
                </li>
                <li className="m-2">
                  Cookies: Small files that are placed on Your computer, mobile device or any other
                  device by a website, containing the details of Your browsing history on that
                  website among its many uses.
                </li>
                <li className="m-2">Country refers to: Delaware, United States</li>
                <li className="m-2">
                  Device: Any device that can access the Service such as a computer, a cellphone or
                  a digital tablet
                </li>
                <li className="m-2">
                  Personal data: Any information that relates to an identifiable person
                </li>
                <li className="m-2">Service: Refers to the Website</li>
                <li className="m-2">
                  Website: PostReview, accessible at{" "}
                  <a
                    className="font-thin underline text-green hover:text-green-dark"
                    href="https://postreview.org/"
                  >
                    https://postreview.org/
                  </a>
                </li>
                <li className="m-2">
                  Service provider: any natural or legal person who processes and process the data
                  on behalf of us.
                </li>
                <li className="m-2">
                  Usage data: data collected automatically, either generated by using our service
                </li>
                <li className="m-2">
                  You: The individual person, or any legal entity, accessing PostReview
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.personal}>
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              onClick={() => handleClick("personal")}
            >
              <Typography variant="h5" fontWeight="bold">
                Personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 font-thin text-black/90 dark:text-white">
                While using PostReview, we may ask you to provide us with personally identifiable
                information that can be used to contact or identify you. Personally identifiable
                information may include, but is not limited to, email address and your name.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.usage}>
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
              onClick={() => handleClick("usage")}
            >
              <Typography variant="h5" fontWeight="bold">
                Usage data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  Usage data is collected automatically when using PostReview.
                </li>
                <li className="m-2">
                  Usage data may include information such as IP address, browser type, browser
                  version, the pages visited, the time and date of visit, and other diagnostic data.
                </li>
                <li className="m-2">
                  We use the service Splitbee provided by Tobias Lins e.U. Alserbachstraße 10 1090
                  Vienna to collect usage data. Data may include a unique ID, your country, page
                  views, the referrer, the user agent, and usage duration. Splitbee does not store
                  an IP address or any information that would make it possible to identify you as a
                  natural person.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.cookies}>
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
              onClick={() => handleClick("cookies")}
            >
              <Typography variant="h5" fontWeight="bold">
                Cookies
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  A cookie is a small file placed on your device. You can instruct your browser to
                  refuse all cookies or to indicate when a Cookie is being sent, or how long it
                  stores cookies.
                </li>
                <li className="m-2">
                  We only use cookies if they are necessarily to provide our services to you. The
                  following are essential cookies to provide with you the website functionality:
                </li>
                <ul className="mx-8 my-4 font-thin list-disc">
                  <li className="m-2">Anonymous session token for account access</li>
                  <li className="m-2">Anti-cross-site request forgery for security purposes</li>
                  <li className="m-2">
                    Public data token to provide easy access to public account data
                  </li>
                </ul>
                <li className="m-2">Typically, the cookies we use do not contain personal data.</li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.purposes}>
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
              onClick={() => handleClick("purposes")}
            >
              <Typography variant="h5" fontWeight="bold">
                Purposes of processing your data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 font-thin text-black/90 dark:text-white">
                We may use your personal data for the following purposes:
              </p>
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  To provide and maintain our service, including to monitor the usage, for
                  maintaining the security and integrity of our IT systems.
                </li>
                <li className="m-2">
                  To contact you: To contact you via electronic communication, such as email or push
                  notifications regarding updates or informative communications related to the
                  functionalities, products, services, or security updates.
                </li>
                <li className="m-2">
                  To provide you with news and general information about other goods, services and
                  events, unless you have opted not to receive such information
                </li>
                <li className="m-2">
                  To manage your requests: To attend and manage your requests to us.{" "}
                </li>
                <li className="m-2">
                  To respond to the chat support: We use the service Crisp provided by Crisp IM SARL
                  2 Boulevard de Launay, 44100 Nantes, France. Crisp collects information such as
                  the messages that you send, activity status, timezone, IP address, device type,
                  IP-based geolocation, preferred language, page activity, professional life data,
                  and guesses data from public information on Google (e.g., avatar; Twitter/Facebook
                  handle).
                </li>
                <li className="m-2">
                  For evaluating our service: We may use your information for other purposes, such
                  as data analysis, identifying usage trends, evaluating and improving PostReview.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.share}>
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
              onClick={() => handleClick("share")}
            >
              <Typography variant="h5" fontWeight="bold">
                We may share your personal information
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                In the following situations:
              </p>
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  With service providers: We may share your personal information with service
                  providers to monitor and analyze the use of our service, or to contact you.
                </li>
                <li className="m-2">
                  For business transfers: We may share or transfer Your personal information in
                  connection with, or during negotiations of, any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business to another company.
                </li>
                <li className="m-2">
                  With other users: When you share personal information or otherwise interact in the
                  public areas with other users, such information may be viewed by all users and may
                  be publicly distributed outside.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.retention}>
            <AccordionSummary
              aria-controls="panel7d-content"
              id="panel7d-header"
              onClick={() => handleClick("retention")}
            >
              <Typography variant="h5" fontWeight="bold">
                Retention of your personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  The Company will retain your personal data only for as long as is necessary for
                  the purposes set out in this privacy policy. We will retain and use your personal
                  data to the extent necessary to comply with our legal obligations (for example, if
                  we are required to retain your data to comply with applicable laws), resolve
                  disputes, and enforce our legal agreements and policies.
                </li>
                <li className="m-2">
                  The Company will also retain usage data for internal analysis purposes. Usage data
                  is generally retained for a shorter period of time, except when this data is used
                  to strengthen the security or to improve the functionality of our service, or We
                  are legally obligated to retain this data for longer time periods.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.transfer}>
            <AccordionSummary
              aria-controls="panel8d-content"
              id="panel8d-header"
              onClick={() => handleClick("transfer")}
            >
              <Typography variant="h5" fontWeight="bold">
                Transfer of your personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  Your information is processed at our offices and in other places where data
                  centers are located. It means that this information may be transferred to—and
                  maintained on—computers located outside your state, province, country or other
                  governmental jurisdiction where the data protection laws may differ than those
                  from Your jurisdiction.
                </li>
                <li className="m-2">
                  Specifically, we use the following service providers to store your data to conduct
                  our service:
                </li>
                <ul className="mx-8 my-4 font-thin list-none">
                  <li className="m-2">
                    a. Heroku, 415 Mission Street, Suite 300, San Francisco, CA 94105, USA
                  </li>
                  <li className="m-2">
                    b. Uploadcare Inc., Burrard St, Vancouver, BC V7X 1M8, Canada
                  </li>
                </ul>
                <li className="m-2">
                  Your consent to this privacy followed by your submission of such information
                  represents your agreement to that transfer.
                </li>
                <li className="m-2">
                  We will take all steps reasonably necessary to ensure that Your data is treated
                  securely and in accordance with this privacy followed, and no transfer of your
                  personal data will take place to an organization or a country unless there are
                  adequate controls in place including the security of your data and other personal
                  information.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.disclosure}>
            <AccordionSummary
              aria-controls="panel9d-content"
              id="panel9d-header"
              onClick={() => handleClick("disclosure")}
            >
              <Typography variant="h5" fontWeight="bold">
                Disclosure of your personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  Business Transactions: If we are involved in a merger, acquisition or asset sale,
                  your personal data may be transferred. We will provide notice before your personal
                  data is transferred and becomes subject to a different privacy policy.
                </li>
                <li className="m-2">
                  Law enforcement: Under certain circumstances, we may be required to disclose your
                  personal data if required to do so by law or in response to valid requests by
                  public authorities (e.g. a court or a government agency).
                </li>
                <li className="m-2">
                  Other legal requirements: We may disclose your personal data in the good faith
                  belief that such action is necessary to
                </li>
                <ul className="mx-8 my-4 font-thin list-disc">
                  <li className="m-2">Protect and defend the rights or property of our company</li>
                  <li className="m-2">
                    Prevent or investigate possible wrongdoing in connection with the service
                  </li>
                  <li className="m-2">
                    Protect the personal safety of users of the service or the public
                  </li>
                  <li className="m-2">Protect against legal liability</li>
                </ul>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.security}>
            <AccordionSummary
              aria-controls="panel10d-content"
              id="panel10d-header"
              onClick={() => handleClick("security")}
            >
              <Typography variant="h5" fontWeight="bold">
                Security of your personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                The security of your personal data is important to us, but remember that no method
                of transmission over the Internet, or method of electronic storage, is 100% secure.
                While we strive to use commercially acceptable means to protect your personal data,
                we cannot guarantee its absolute security.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.changes}>
            <AccordionSummary
              aria-controls="panel11d-content"
              id="panel11d-header"
              onClick={() => handleClick("changes")}
            >
              <Typography variant="h5" fontWeight="bold">
                Changes to this privacy policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <ul className="mx-4 my-4 font-thin list-decimal">
                <li className="m-2">
                  We may update our privacy policy from time to time. We will notify you of any
                  changes by posting the new privacy policy on this page.
                </li>
                <li className="m-2">
                  We will let you know via email and/or a prominent notice on our service, before
                  the change becoming effective, and update the &quot;Last updated&quot; date at the
                  top of this privacy policy.
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ ...accordionStyle }} expanded={accordion.contact}>
            <AccordionSummary
              aria-controls="panel12d-content"
              id="panel12d-header"
              onClick={() => handleClick("contact")}
            >
              <Typography variant="h5" fontWeight="bold">
                Contact us
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-gray-dark text-black/80 dark:text-white/80">
              <p className="mx-2 my-3 font-thin text-black/90 dark:text-white/90">
                If you have any questions about this privacy policy, You can contact us by email:{" "}
                <a
                  className="font-thin underline text-green hover:text-green-dark"
                  href="mailto:info@postreview.org"
                >
                  info@postreview.org
                </a>
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </main>
    </div>
  )
}

PrivacyPolicyPage.getLayout = (page) => <Layout title="Privacy Policy | PostReview">{page}</Layout>

export default PrivacyPolicyPage
