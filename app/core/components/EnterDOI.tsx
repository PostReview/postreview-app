import React, { useEffect, useState, createContext } from "react"
import ArticleList from "./ArticleList"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

export const ArticleContext = createContext([] as any)

export default function EnterDOI() {
  const LOCAL_STORAGE_KEY = "doiResolver"
  const defaultDoi = "10.3390/publications7020040"
  const [doi, setDoi] = useState(defaultDoi)
  const [articles, setArticles] = useState([] as any)

  const ArticleContextValue = {
    handleArticleDelete,
    setArticles,
  }

  //   Initialize Local Storage
  useEffect(() => {
    const articleJSON = localStorage.getItem(LOCAL_STORAGE_KEY) as any
    if (typeof articleJSON !== "undefined") setArticles(JSON.parse(articleJSON))
  }, [])

  // saving the data to local storage when articles changes (setItem)
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles))
  }, [articles])
  function handleArticleNotFound() {
    return null
  }

  async function getArticleMetadata() {
    try {
      const doiURL = "https://api.crossref.org/works/" + doi
      const response = await axios.get(doiURL)
      const newArticleMetadata = response.data.message
      // const plauditData = await getPlauditMetadata() //   Get plaudit data and inject to new article
      //   const plauditData = null
      // const plauditNumEvents = plauditData?.events?.length
      const newArticle = {
        id: uuidv4(),
        metadata: newArticleMetadata,
        // plaudit_count: plauditNumEvents,
      }

      setArticles([newArticle, ...articles])
    } catch {
      handleArticleNotFound()
    }
  }

  function handleArticleDelete(id) {
    setArticles(articles.filter((article) => article.id !== id))
  }

  return (
    <div>
      {/* Article List */}
      <div className="m-1 p-6 bg-green-50 rounded-md">
        <input
          placeholder="Enter DOI"
          className="border border-transparent focus:outline-none focus:ring-2 rounded-md shadow-md w-60"
          type="text"
          name="doi"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
        ></input>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 mx-2 px-2 border rounded-md"
          onClick={getArticleMetadata}
        >
          Add Article
        </button>
      </div>
      <ArticleContext.Provider value={ArticleContextValue}>
        <ArticleList articles={articles} />
      </ArticleContext.Provider>
    </div>
  )
}

const defaultArtciles = {
  id: uuidv4(),
  metadata: undefined,
}
