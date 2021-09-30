import React, { useContext } from "react"
import { FaBook, FaUser } from "react-icons/fa"
import { Link } from "@blitzjs/core"

export default function Article(props) {
  const { handleArticleDelete, id, authorString, doi, title } = props

  return (
    <div className="m-2 p-2 bg-yellow-50 rounded hover:bg-yellow-100">
      <div>
        <div id="author" className="font-semibold inline">
          <Link href={`/articles/${id}`}>{title}</Link>
        </div>
        <button
          onClick={() => handleArticleDelete(id)}
          className="flex text-white bg-red-200 hover:bg-red-500 px-2 float-right rounded-full h-6 w-6 items-center justify-center"
        >
          &#215;
        </button>
      </div>
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
  )
}
