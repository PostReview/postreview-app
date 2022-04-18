import { useMutation, invoke, useRouter } from "blitz"
import React, { useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FaBook, FaUser } from "react-icons/fa"
import addArticle from "app/mutations/addArticle"
import getArticleByDoi from "app/queries/getArticleByDoi"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { Autocomplete } from "./Autocomplete"
import { Button } from "./Button"

export default function AddPaperPopup(prop) {
  const { setPaperPopupOpen } = prop
  const currentUser = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const defaultDoi = ""
  const [doi, setDoi] = useState(defaultDoi)
  const [addArticleMutation] = useMutation(addArticle)
  const [selectedPaper, setSelectedPaper] = useState({
    title: undefined,
    authors: undefined,
    publishedYear: undefined,
  })

  async function getArticleMetadata() {
    if (!doi) return handleArticleNotFound()
    try {
      const doiURL = "https://api.crossref.org/works/" + doi
      const response = await axios.get(doiURL)
      const newArticleMetadata = response.data.message
      return newArticleMetadata
    } catch {
      handleArticleNotFound()
    }
  }

  const parseAuthors = (author, i, authors) => {
    if (authors.length - 1 === i) {
      /* If last author, do not print the semicolon */
      return `${author.family}, ${author.given}`
    } else {
      return `${author.family}, ${author.given}; `
    }
  }

  async function parseArticleMetadata(newArticleMetadata) {
    const newArticle = {
      id: uuidv4(),
      title: newArticleMetadata.title[0],
      doi: newArticleMetadata.DOI,
      publishedYear: newArticleMetadata.created["date-parts"][0][0],
      journal: newArticleMetadata["container-title"][0],
      addedBy: currentUser?.handle,
      addedById: currentUser?.id,
      authorString: newArticleMetadata?.author
        ? newArticleMetadata?.author.map(parseAuthors).join("")
        : "",
    }
    return newArticle
  }

  function handleArticleNotFound() {
    window.alert("Article not found")
  }

  const router = useRouter()
  async function handleArticleAdd() {
    setLoading(true)
    const newArticleMetadata = await getArticleMetadata()
    if (!newArticleMetadata) return null
    const newArticle = await parseArticleMetadata(newArticleMetadata)
    // Is article already in the database?
    const existingArticle = await invoke(getArticleByDoi, newArticle.doi)
    if (existingArticle) return router.push("/articles/" + existingArticle.id)
    // push to database
    const addedArticle = await invoke(addArticleMutation, { ...newArticle })
    // Close the dialog
    setPaperPopupOpen(false)
    // go to the added article
    router.push(`/articles/${addedArticle.id}`)
    setLoading(false)
  }

  return (
    <>
      <DialogTitle>
        <div className="text-center">Add a new paper</div>
      </DialogTitle>
      <DialogContent>
        <div className="text-center w-96 m-4 mx-20">
          <Autocomplete
            debug={false}
            placeholder="Search by title, author, keyword"
            getSources={({ query }) => {
              return fetch(
                `https://api.crossref.org/works/?query=${query}&select=title,author,published,DOI&rows=5`
              )
                .then((response) => response.json())
                .then(({ message }) => {
                  return [
                    {
                      sourceId: "message",
                      onSelect(params) {
                        const { item, setQuery } = params
                        // Set the doi of the article
                        const currentItem = {
                          title: item?.title?.[0],
                          publishedYear: item?.published?.["date-parts"]?.[0]?.[0],
                          authors: item?.author ? item?.author.map(parseAuthors).join("") : "",
                        }
                        setSelectedPaper(currentItem)
                        setDoi(item.DOI)
                      },
                      getItems() {
                        return message.items
                      },
                      getItemInputValue({ item }) {
                        return item.description
                      },
                      templates: {
                        item({ item, components }) {
                          const currentItem = {
                            title: item?.title?.[0],
                            publishedYear: item?.published?.["date-parts"]?.[0]?.[0],
                            authors: item?.author ? item?.author.map(parseAuthors).join("") : "",
                          }
                          return (
                            <div className="my-1 mx-1 flex">
                              <div className="mr-2">{currentItem.title}</div>
                              <div>
                                <p className="text-md font-normal leading-4 text-gray-500 dark:text-gray-400">
                                  {currentItem?.authors} ({currentItem.publishedYear})
                                </p>
                              </div>
                            </div>
                          )
                        },
                        noResults() {
                          return <div>No results</div>
                        },
                      },
                    },
                  ]
                })
            }}
          />
        </div>
        {selectedPaper.title ? (
          <div>
            <div id="paper-info-container" className="bg-slate-100 p-4">
              <strong>{selectedPaper?.title} </strong>
              <div>
                <FaUser className="inline mr-2 text-gray-700" />
                {selectedPaper?.authors} ({selectedPaper?.publishedYear})
              </div>
              <a href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer">
                <div className="text-violet-600 hover:underline">
                  <FaBook className="inline mr-2" />
                  {`https://doi.org/${doi}`}
                </div>
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="cancel" onClick={() => setPaperPopupOpen(false)}>
          Cancel
        </Button>
        <Button loading={loading ? 1 : 0} onClick={handleArticleAdd}>
          Add Paper
        </Button>
      </DialogActions>
    </>
  )
}
