import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import { Image, useRouter } from "blitz"
import React, { useState } from "react"
import postReviewIcon from "/public/logo-withname-lightmode.png"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import { alpha } from "@mui/material"

import styled from "@emotion/styled"
import { FaGithub, FaDiscord } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"

export const DrawerMenu = () => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({}) => ({
    background: "transparent",
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

  const datetime = new Date()

  return (
    <>
      <Button onClick={() => toggleDrawer()}>{"asdf"}</Button>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <div className="w-full h-full bg-gray-light flex flex-col overflow-clip">
          <div id="logo-container" className="ml-8">
            <Image src={postReviewIcon} alt={"A magnifier with a hat"} height={250} width={250} />
          </div>
          <div className="border border-gray-medium" />
          <List>
            <ListItemButton sx={{ ...hoverSx }}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ ...hoverSx }}>
                <Typography>About us</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItemButton sx={{ ...hoverSx }}>
                  <ListItemText primary={"Our story"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }}>
                  <ListItemText primary={"Team"} />
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ ...hoverSx }}>
                <Typography>Policies</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItemButton sx={{ ...hoverSx }}>
                  <ListItemText primary={"Terms of use"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }}>
                  <ListItemText primary={"Privacy policy"} />
                </ListItemButton>
                <ListItemButton sx={{ ...hoverSx }} onClick={() => router.push("code-of-conduct")}>
                  <ListItemText primary={"Code of conduct"} />
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </List>
          <div className="border border-gray-medium" />
          <div id="social-icons" className="my-4 mx-2">
            <div>Connect with us</div>
            <div className="flex flex-row text-4xl justify-around mr-20 my-4 text-gray-medium">
              <a
                href="https://github.com/PostReview/postreview-app"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a href="https://twitter.com/PostReviewOrg" target="_blank" rel="noreferrer">
                <AiFillTwitterCircle />
              </a>
              <a href="https://discord.com/invite/gZ4Hn2VryK" target="_blank" rel="noreferrer">
                <FaDiscord />
              </a>
            </div>
          </div>
          <div id="sign-up-button" className="mx-2 ">
            <button className="bg-green px-3 py-1 rounded-lg">Sign up</button>
          </div>
          <div id="copyright" className="self-end mx-4 mt-10 text-xl text-gray-medium">
            <span className="text-2xl">&copy;</span> PostReview {datetime.getFullYear()}
          </div>
        </div>
      </Drawer>
    </>
  )
}
