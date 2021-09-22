import React, { useContext } from "react"
import Article from "./Article"
import { ArticleContext } from "./EnterDOI"

export default function ArticleList(props) {
  const { handleArticleDelete } = useContext(ArticleContext)
  const { articles } = props
  console.log(articles?.map((article) => article.id))

  if (!articles) return null
  return (
    <div>
      {articles?.map((article) => {
        return <Article key={article.id} handleArticleDelete={handleArticleDelete} {...article} />
      })}
    </div>
  )
}
