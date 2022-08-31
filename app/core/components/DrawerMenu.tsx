import {
  AccordionDetails,
  AccordionSummary,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import { Image, useRouter, useSession } from "blitz"
import React from "react"
import postReviewIcon from "/public/logo-withname-lightmode.png"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import { alpha } from "@mui/material"
import styled from "@emotion/styled"
import { FaGithub, FaDiscord, FaBars } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"

export const DrawerMenu = (props) => {
  const { open, setOpen } = props
  const session = useSession()
  const router = useRouter()

  // Style the MUI accordion components
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({}) => ({
    background: "#d9d9d9",
    border: `none`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }))
  const hoverSx = {
    ":hover": {
      background: alpha("#94EC01", 0.25),
    },
  }

  // Get date for automatically update the copyright year
  const datetime = new Date()

  return (
    <>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#d9d9d9",
            color: "#2c2e2e",
            fontWeight: "bold",
          },
        }}
      >
        <div className="w-full h-full bg-gray-light flex flex-col overflow-clip">
          <div id="logo-container" className="ml-8">
            <Image src={postReviewIcon} alt={"A magnifier with a hat"} height={250} width={250} />
          </div>
          <div className="border border-gray-medium" />
          <List>
            <ListItemButton
              sx={{ ...hoverSx }}
              onClick={() => router.push(session.userId ? "/" : "/?search=true")}
            >
              <Typography sx={{ fontWeight: "bold" }}>Home</Typography>
            </ListItemButton>
            <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/how-it-works")}>
              <Typography sx={{ fontWeight: "bold" }}>How it works</Typography>
            </ListItemButton>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ ...hoverSx }}>
                <Typography sx={{ color: "#2c2e2e", fontWeight: "bold" }}>About us</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/mission-vision")}>
                  <ListItemText primary={"Mission and Vision"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/about")}>
                  <ListItemText primary={"Our story"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/team")}>
                  <ListItemText primary={"Team"} />
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ ...hoverSx }}>
                <Typography sx={{ color: "#2c2e2e", fontWeight: "bold" }}>Policies</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/code-of-conduct")}>
                  <ListItemText primary={"Code of conduct"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/privacy-policy")}>
                  <ListItemText primary={"Privacy policy"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("/terms-of-use")}>
                  <ListItemText primary={"Terms of use"} />
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </List>
          <div className="border border-gray-medium bg-gray-light" />
          <div id="social-icons" className="my-4 mx-2  bg-gray-light">
            <div>Connect with us</div>
            <div className="flex flex-row text-4xl justify-around mr-20 my-4 text-gray-medium">
              <a
                href="https://github.com/PostReview/postreview-app"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-dark"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com/PostReviewOrg"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-dark"
              >
                <AiFillTwitterCircle />
              </a>
              <a
                href="https://discord.com/invite/gZ4Hn2VryK"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-dark"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
          <div id="sign-up-button" className="mx-2 bg-gray-light">
            <button
              className="px-3 py-1 font-semibold rounded-lg text-gray-darkest hover:text-black bg-green hover:bg-green-dark"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </button>
          </div>
          <div
            id="copyright"
            className="self-end mx-4 mt-10 text-lg bg-gray-light text-gray-medium/60"
          >
            <span className="text-2xl">&copy;</span> PostReview {datetime.getFullYear()}
          </div>
        </div>
      </Drawer>
    </>
  )
}
