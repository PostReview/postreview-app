import React from "react"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import GroupsIcon from "@mui/icons-material/Groups"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"

const visions = [
  {
    name: "Transparency",
    description:
      "We believe in the power of transparency for creating a fair and accurate consensus in research.",
    icon: <VolunteerActivismIcon sx={{ fontSize: 60 }} />,
  },
  {
    name: "Diversity",
    description:
      "We want to amplify the voices of underrepresented groups and identities in science, \
      for truly unlocking the wisdom of the community",
    icon: <GroupsIcon sx={{ fontSize: 60 }} />,
  },
  {
    name: "Accountability",
    description:
      "By being open to give and receive healthy feedback, we can correct errors in science.",
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 60 }} />,
  },
]

export const Visions = () => {
  return (
    <div className="flex flex-col my-12">
      <h1 className="text-4xl self-center m-6 font-bold">Our principles</h1>
      <div className="flex max-w-7xl sm:flex-row flex-col m-3">
        {visions.map((vision) => (
          <div key={vision.name} className="flex-1 m-6 flex flex-col items-center">
            <div className=""> {vision.icon}</div>
            <h2 className="text-xl font-bold">{vision.name}</h2>
            <div className="text-gray-600">{vision.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
