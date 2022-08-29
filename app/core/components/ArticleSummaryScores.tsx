import { Accordion, AccordionDetails, AccordionSummary, Rating } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"

import React from "react"
import { FaUsers } from "react-icons/fa"
import { Image } from "blitz"
import sadFace from "public/sad-face.png"

export const ArticleSummaryScores = (props) => {
  const {
    isAccordionOpen,
    toggleAccordion,
    questionCategories,
    articleScores,
    ratingScaleMax,
    smallStarColor,
    articleHasReview,
    totalRating,
    usersWithReview,
  } = props
  return (
    <>
      {!articleHasReview ? (
        // When the article does not have a review, render the sad face
        <div id="no-rating" className="flex flex-col items-center">
          <div className="mt-16 w-56">
            <Image src={sadFace} alt="A picture of a sad face with a single teardrop" />
          </div>
          <div
            id="call-to-action"
            className="mt-10 mb-6 text-lg font-semibold text-gray-darkest dark:text-white"
          >
            No reviews yet. Be the first to review!
          </div>
        </div>
      ) : (
        <>
          <div id="with-rating-total">
            <div className="flex flex-row items-center">
              <div className="py-8 text-7xl font-bold text-gray-darkest dark:text-white">
                {totalRating.toFixed(1)}
              </div>
              <Rating
                readOnly
                value={totalRating / ratingScaleMax}
                precision={0.1}
                max={1}
                sx={{
                  fontSize: 120,
                  color: "#94ec01",
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.4, color: "#737373" }} fontSize="inherit" />
                }
              />
            </div>
          </div>
          <div id="g-num-reviews">
            <FaUsers className="inline mr-2 text-gray-darkest dark:text-white" />
            <span className="text-green">{usersWithReview.length} global ratings</span>
          </div>
        </>
      )}
      {!isAccordionOpen && (
        <div
          id="category-scores"
          className="flex flex-row mt-3 hover:cursor-pointer"
          onClick={() => toggleAccordion()}
        >
          {questionCategories.map((category) =>
            articleScores.find((score) => score.questionId === category.questionId)?._avg
              .response! ? (
              <div key={category.questionId} className="text-center mx-2">
                <div className="flex items-center justify-center">
                  {/* Rendering the score digits */}
                  <div className="absolute text-gray-darkest font-semibold text-base z-50">
                    {articleScores
                      .find((score) => score.questionId === category.questionId)
                      ?._avg.response!.toFixed(1)}
                  </div>
                  <Rating
                    readOnly
                    value={
                      articleScores.find((score) => score.questionId === category.questionId)?._avg
                        .response! / ratingScaleMax
                    }
                    precision={0.1}
                    max={1}
                    sx={{
                      fontSize: 60,
                      color: smallStarColor,
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.4, color: "#737373" }} fontSize="inherit" />
                    }
                  />
                </div>
                <div className="w-16 text-center text-[0.7rem] text-gray-darkest dark:text-white">
                  {category.questionCategory}
                </div>
              </div>
            ) : (
              // When the category does not have a star (N/A)
              <div key={category.questionId} className="text-center mx-2">
                <div className="flex items-center justify-center">
                  <div className="absolute text-gray-darkest font-semibold text-xs opacity-70 z-50">
                    N/A
                  </div>
                  <Rating
                    readOnly
                    value={0}
                    precision={0.1}
                    max={1}
                    sx={{
                      fontSize: 60,
                      color: smallStarColor,
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.3, color: "#737373" }} fontSize="inherit" />
                    }
                  />
                </div>
                <div className="w-16 text-center text-[0.7rem] opacity-70 text-gray-darkest dark:text-white">
                  {category.questionCategory}
                </div>
              </div>
            )
          )}
        </div>
      )}
      <Accordion
        expanded={isAccordionOpen}
        onChange={() => toggleAccordion()}
        sx={{
          backgroundColor: "transparent",
          display: "hidden",
          border: 0,
          borderColor: "transparent",
          boxShadow: 0,
          width: "auto",
          padding: 0,
          transitionDelay: 0,
          msTransitionDuration: 0,
          ":before": {
            display: "none",
          },
        }}
        onClick={() => toggleAccordion()}
      >
        <AccordionSummary
          expandIcon={undefined}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{ root: "hidden" }}
        ></AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col hover:cursor-pointer">
            {questionCategories.map((category) =>
              articleScores.find((score) => score.questionId === category.questionId)?._avg
                .response! ? (
                <div key={category.questionId} className="text-center my-4">
                  <div className="flex flex-row items-center justify-between">
                    {/* Rendering the score digits */}
                    <div className="text-left">
                      <div className="text-lg text-gray-darkest dark:text-white">
                        {category.questionCategory}
                      </div>
                      <div id="g-num-reviews" className="text-left">
                        <FaUsers className="inline mr-2 text-gray-darkest dark:text-white" />
                        <span className="font-bold text-green-dark">
                          {
                            articleScores.find((score) => score.questionId === category.questionId)
                              ?._count.response
                          }
                        </span>
                      </div>
                    </div>
                    <div className="absolute pl-48 text-2xl font-semibold text-gray-darkest dark:text-white">
                      {articleScores
                        .find((score) => score.questionId === category.questionId)
                        ?._avg.response!.toFixed(1)}
                    </div>
                    <div className="pl-24">
                      <Rating
                        readOnly
                        value={
                          articleScores.find((score) => score.questionId === category.questionId)
                            ?._avg.response! / ratingScaleMax
                        }
                        precision={0.1}
                        max={1}
                        sx={{
                          fontSize: 60,
                          color: smallStarColor,
                        }}
                        emptyIcon={
                          <StarIcon style={{ opacity: 0.4, color: "#737373" }} fontSize="inherit" />
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // When the category does not have a star (N/A)
                <div key={category.questionId} className="text-center my-4">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-left">
                      <div className="text-lg opacity-70 text-gray-darkest dark:text-white">
                        {category.questionCategory}
                      </div>
                      <div id="g-num-reviews" className="text-left">
                        <FaUsers className="inline mr-2 text-gray-darkest dark:text-white" />
                        <span className="font-bold text-green-dark">0</span>
                      </div>
                    </div>
                    <div className="absolute pl-48 text-xl text-gray-darkest dark:text-white opacity-70">
                      N/A
                    </div>
                    <div className="pl-24">
                      <Rating
                        readOnly
                        value={0}
                        precision={0.1}
                        max={1}
                        sx={{
                          fontSize: 60,
                          color: smallStarColor,
                        }}
                        emptyIcon={
                          <StarIcon style={{ opacity: 0.3, color: "#737373" }} fontSize="inherit" />
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
