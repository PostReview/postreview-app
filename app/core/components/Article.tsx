import React from "react"
import { FaBarcode, FaCrown, FaUsers } from "react-icons/fa"
import { Link } from "next/link"
import { Rating } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"

export default function Article(props) {
  const {
    id,
    authorString,
    doi,
    title,
    publishedYear,
    ratingTotal,
    ratingRQ,
    ratingDesign,
    ratingFindings,
    ratingInterpretation,
    ratingSignificance,
    ratingsCount,
    questionCategory,
  } = props

  var selectedRating
  switch (questionCategory) {
    case "Overall":
      selectedRating = ratingTotal
      break
    case "Research Question":
      selectedRating = ratingRQ
      break
    case "Design":
      selectedRating = ratingDesign
      break
    case "Findings":
      selectedRating = ratingFindings
      break
    case "Interpretation":
      selectedRating = ratingInterpretation
      break
    case "Significance":
      selectedRating = ratingSignificance
      break
  }

  const ratingScaleMax = 5
  const publishedYearString = `(${publishedYear})`

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])
  const smallStarColor = isDark ? "#d9d9d9" : "#737373"

  return (
    <div
      className="mx-6 my-2 p-2 bg-transparent border-gray-medium border-2
    flex flex-col items min-w-fit max-w-3xl text-white"
    >
      <div id="title-star-container" className="w-full flex md:flex-row flex-row justify-between">
        <div id="title" className="font-semibold inline mr-3">
          <Link href={`/articles/${id}`}>
            {title.length < 70 ? title :
              title.slice(0, 70) + "..."}
          </Link>
        </div>
        <div id="with-rating-total">
          <div className="flex flex-row items-end">
            <div className="text-5xl font-bold text-white">
              {ratingTotal?.toFixed(1)}
            </div>
            <Rating
              readOnly
              value={ratingTotal / ratingScaleMax}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 70,
                color: "#94ec01",
              }}
              emptyIcon={<StarIcon style={{ opacity: .40, color: "#737373" }} fontSize="inherit" />}
            />
          </div>
        </div>
      </div>
      <div id="bottom-container" className="flex flex-row items-end justify-between">
        <div id="g-ratings-container" className="text-green-dark text-[0.8rem] whitespace-nowrap">
          <FaUsers className="inline mr-2 text-gray-light" />
          {ratingsCount} global ratings
        </div>
        <div id="author-doi-container" className="flex flex-col items-end">
          <div className="text-[0.9rem] text-gray-light">
            <FaCrown className="inline mr-2" />
            {authorString.length < 20 ? authorString : authorString.slice(0, 20) + "..."}{" "}
            {publishedYear && publishedYearString}
          </div>
          <div className="text-[0.8rem] text-green-dark/60 underline whitespace-nowrap">
            <a href={`https://dx.doi.org/${doi}`} rel="noreferrer" target="_blank">
              <FaBarcode className="inline mr-2 text-green-dark/60" />
              {doi}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
