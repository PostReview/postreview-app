import React, { useEffect, useState, createContext } from "react"
import { useQuery, invoke, useMutation } from "blitz"
import addArticle from "../../mutations/addArticle"
import deleteArticle from "../../mutations/deleteArticle"
import getArticles from "../../queries/getArticles"
import isArticlePresent from "../../queries/isArticlePresent"
import ArticleList from "./ArticleList"
import PopupDuplicateArticle from "../components/PopupDuplicateArticle"
import axios from "axios"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { v4 as uuidv4 } from "uuid"
import Popup from "./Popup"

export const ArticleContext = createContext([] as any)

export default function EnterDOI() {
  const currentUser = useCurrentUser()
  const defaultDoi = "10.3390/publications7020040"
  const [doi, setDoi] = useState(defaultDoi)
  const [articles, setArticles] = useState([] as any)
  // Popup
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const ArticleContextValue = {
    handleArticleDelete,
    setArticles,
  }
  const [defaultArticles] = useQuery(getArticles, undefined)

  const [addArticleMutation] = useMutation(addArticle)
  const [deleteArticleMutation] = useMutation(deleteArticle)

  // Get the database data when the page is loaded
  useEffect(() => {
    setArticles(defaultArticles)
  }, [])

  async function getArticleMetadata() {
    try {
      const doiURL = "https://api.crossref.org/works/" + doi
      const response = await axios.get(doiURL)
      const newArticleMetadata = response.data.message
      return newArticleMetadata
    } catch {
      handleArticleNotFound()
    }
  }

  async function parseArticleMetadata(newArticleMetadata) {
    const newArticle = {
      id: uuidv4(),
      title: newArticleMetadata.title[0],
      doi: newArticleMetadata.DOI,
      publishedYear: newArticleMetadata.created["date-parts"][0][0],
      journal: newArticleMetadata["short-container-title"][0],
      addedBy: currentUser?.handle,
      addedById: currentUser?.id,
      authorString: newArticleMetadata.author
        .map((author, i, authors) => {
          if (authors.length - 1 === i) {
            /* If last author, do not print the semicolon */
            return `${author.family}, ${author.given}`
          } else {
            return `${author.family}, ${author.given}; `
          }
        })
        .toString(),
    }
    return newArticle
  }

  async function handleArticleAdd() {
    const newArticleMetadata = await getArticleMetadata()
    if (!newArticleMetadata) return null

    const newArticle = await parseArticleMetadata(newArticleMetadata)
    // Is article already in the database?
    const alreadyInDb = await invoke(isArticlePresent, newArticle.doi)
    if (alreadyInDb) return togglePopup()
    // push to database
    await invoke(addArticleMutation, { ...newArticle })
    window.location.reload()

    // read from database
    // setArticles([newArticle, ...articles])

    // add authors - implement with Nested Writes in the future
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
  }

  async function handleArticleDelete(id) {
    setArticles(articles.filter((article) => article.id !== id))
    await invoke(deleteArticleMutation, id)
  }

  function handleArticleNotFound() {
    window.alert("Article not found")
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
          onClick={handleArticleAdd}
        >
          Add Article
        </button>
      </div>
      <ArticleContext.Provider value={ArticleContextValue}>
        <ArticleList articles={articles} />
      </ArticleContext.Provider>
      {isOpen && <Popup content={<PopupDuplicateArticle />} handleClose={togglePopup} />}
    </div>
  )
}
