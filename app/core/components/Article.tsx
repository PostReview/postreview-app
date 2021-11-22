import React from "react"
import { FaBook, FaUser } from "react-icons/fa"
import { Link } from "@blitzjs/core"
import { Rating } from "@mui/material"
import Chip from '@mui/material/Chip';


export default function Article(props) {
  const {
    id,
    authorString,
    doi,
    title,
    disabled,
    article,
    user
  } = props

  const ratingsCount = 113
  return (
    <div
      className="bg-gray-50 m-6 p-4 border-gray-600 border-2
    flex flex-col  max-w-5xl"
    >
      <div>
        <div
          id="article-header"
          className="flex flex-row"
        >
          <Chip label={ratingsCount} className="mr-2" />
          <div id="title" className="font-semibold inline">
            {
              disabled ?
                <span>{title}</span> :
                <Link href={`/articles/${id}`}>{title}</Link>
            }
          </div>
          <div>
            <div className="article__author ml-2 text-gray-700">
              <FaUser className="inline mr-2" />
              {authorString}
            </div>
            <div className="article__DOI ml-2 text-gray-700">
              <a rel="noreferrer" target="_blank">
                <FaBook className="inline mr-2" />
                {doi}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id="ratings-container"
        className="flex lg:flex-row flex-col items-center justify-evenly text-xs mx-6"
      >
        <div id="total" className="px-3 border-r-2 text-center">
          <div
            id="total-rating"
          >
            <Rating
              disabled
              defaultValue={0.4}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 100,
                color: "red",
              }}
            />
          </div>
          Total
        </div>
        <div className="px-3 text-center">
          <div
            id="research-question"
          >
            <Rating
              disabled
              defaultValue={0.4}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 100,
              }}
            />
          </div>
          Research Question
        </div>
        <div className="px-3 text-center">
          <div
            id="design"
          >
            <Rating
              disabled
              defaultValue={0.7}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 100,
              }}
            />
          </div>
          Design
        </div>
        {disabled && <div>...</div>}
      </div>
    </div>
  )
}
