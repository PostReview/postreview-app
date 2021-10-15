import React from "react"

export const MyReviewsTable = (props) => {
  const { reviewAnswers } = props
  const uniqueArticleIds = Array.from(new Set(reviewAnswers.map((answer) => answer.articleId)))

  const getMax = (a, b) => Math.max(a, b.questionId)

  let articleArray = [] as any
  for (const articleId of uniqueArticleIds) {
    articleArray.push({
      articleId,
      answers: reviewAnswers.filter((answer) => answer.articleId === articleId),
    })
  }

  return (
    <>
      {articleArray.map((article) => (
        <div key={article.articleId} className="bg-yellow-50 m-6 p-4 rounded-lg">
          <a href={`articles/${article.articleId}`}>
            <h2 className="font-bold">{article.answers[0].targetArticle.title}</h2>
          </a>
          <div className="flex flex-row">
            {article.answers.map((answer) => (
              <div key={answer.id} className="m-6">
                Question {answer.questionId}
                <br /> {answer.response}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
