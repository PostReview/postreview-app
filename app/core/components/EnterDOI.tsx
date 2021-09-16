import React, { useEffect, useState, createContext } from "react"
import { useQuery, invoke, useMutation } from "blitz"
import addArticle from "../../mutations/addArticle"
import deleteArticle from "../../mutations/deleteArticle"
import getArticles from "../../queries/getArticles"
import ArticleList from "./ArticleList"
import axios from "axios"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { v4 as uuidv4 } from "uuid"

export const ArticleContext = createContext([] as any)

export default function EnterDOI() {
  const currentUser = useCurrentUser()

  const LOCAL_STORAGE_KEY = "doiResolver"
  const defaultDoi = "10.3390/publications7020040"
  const [doi, setDoi] = useState(defaultDoi)

  const [articles, setArticles] = useState([] as any)

  const ArticleContextValue = {
    handleArticleDelete,
    setArticles,
  }

  const [defaultArticles] = useQuery(getArticles, undefined)

  // Get the database data when the page is loaded
  useEffect(() => {
    setArticles(defaultArticles)
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
      const newArticle = {
        id: uuidv4(),
        title: newArticleMetadata.title[0],
        doi: newArticleMetadata.DOI,
        publishedYear: newArticleMetadata.created["date-parts"][0][0],
        journal: newArticleMetadata["short-container-title"][0],
        author: newArticleMetadata.author,
        addedBy: currentUser?.name,
        addedById: currentUser?.id,
        newArticleMetadata,
      }
      console.log(newArticle)

      setArticles([newArticle, ...articles])
      await invoke(addArticle, { ...newArticle })
    } catch {
      handleArticleNotFound()
    }
  }

  async function handleArticleDelete(id) {
    setArticles(articles.filter((article) => article.id !== id))
    await invoke(deleteArticle, id)
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
