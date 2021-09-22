import React, { useEffect, useState, createContext } from "react"
import { useQuery, invoke, useMutation } from "blitz"
import addArticle from "../../mutations/addArticle"
import deleteArticle from "../../mutations/deleteArticle"
import getArticles from "../../queries/getArticles"
import isArticlePresent from "../../queries/isArticlePresent"
import findArticleByDoi from "../../queries/findArticleByDoi"
import ArticleList from "./ArticleList"
import PopupDuplicateArticle from "../components/PopupDuplicateArticle"
import axios from "axios"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import db from "db"

import { v4 as uuidv4 } from "uuid"
import Popup from "./Popup"
import addAuthors from "app/mutations/addAuthors"

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
  // Popup
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  // Get the database data when the page is loaded
  useEffect(() => {
    setArticles(defaultArticles)
  }, [defaultArticles])

  console.log(defaultArticles)

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
        title: newArticleMetadata.title[0],
        doi: newArticleMetadata.DOI,
        publishedYear: newArticleMetadata.created["date-parts"][0][0],
        journal: newArticleMetadata["short-container-title"][0],
        addedBy: currentUser?.name,
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
      console.log(newArticle)
      // Is article already in the database?
      const alreadyInDb = await invoke(isArticlePresent, newArticle.doi)
      if (alreadyInDb) return togglePopup()

      // refresh the view by pulling data from database (not SetArticles)
      setArticles([newArticle, ...articles])
      await invoke(addArticle, { ...newArticle })
      // add authors - not implemented right now because many-to-many is difficult
      // const newArticleRes = await invoke(findArticleByDoi, newArticle.doi)
      // await invoke(addAuthors, { ...newArticleMetadata.author, articleId: newArticleRes.id })
    } catch {
      handleArticleNotFound()
    }
  }

  async function handleArticleDelete(id) {
    setArticles(articles.filter((article) => article.id !== id))
    await invoke(deleteArticle, id)
  }

  console.log(articles)

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
      {isOpen && <Popup content={<PopupDuplicateArticle />} handleClose={togglePopup} />}
    </div>
  )
}
