import React from "react"
import { FaBarcode, FaCrown } from "react-icons/fa"

export const ArticleMetadata = (props) => {
  const { article, bold = "font-bold", textBlack = false } = props
  return (
    <>
      <div
        className={`m-6 ${bold} text-2xl text-left max-w-3xl ${
          textBlack ? "text-black" : "text-gray-darkest dark:text-white"
        } `}
      >
        <h1>{article.title}</h1>
      </div>
      <div
        className={`text-base text-center m-2 max-w-2xl ${
          textBlack ? "text-black" : "text-gray-darkest dark:text-white"
        }`}
      >
        <FaCrown className="inline m-2" />
        {article.authorString} {article?.publishedYear && `(${article?.publishedYear})`}
      </div>
      <div className="article__barcode text-base underline max-w-2xl text-green">
        <a href={`https://dx.doi.org/${article.doi}`} rel="noreferrer" target="_blank">
          <FaBarcode className="inline m-2" />
          {article.doi}
        </a>
      </div>
    </>
  )
}
