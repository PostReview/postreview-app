import React, { useState } from "react"
import { invoke, useMutation, useRouter } from "blitz"
import addArticle from "../../mutations/addArticle"
import getArticleByDoi from "../../queries/getArticleByDoi"
import axios from "axios"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { v4 as uuidv4 } from "uuid"
import { Input, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"

export default function EnterDOI() {
  const currentUser = useCurrentUser()
  const defaultDoi = "10.3390/publications7020040"
  const [doi, setDoi] = useState(defaultDoi)
  const [addArticleMutation] = useMutation(addArticle)

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

  const router = useRouter()
  async function handleArticleAdd() {
    const newArticleMetadata = await getArticleMetadata()
    if (!newArticleMetadata) return null
    const newArticle = await parseArticleMetadata(newArticleMetadata)
    // Is article already in the database?
    const existingArticle = await invoke(getArticleByDoi, newArticle.doi)
    if (existingArticle) return router.push("articles/" + existingArticle.id)
    // push to database
    await invoke(addArticleMutation, { ...newArticle })
    window.location.reload()
    // add authors - implement with Nested Writes in the future
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
  }

  function handleArticleNotFound() {
    window.alert("Article not found")
  }

  return (
    <div>
      <div className="m-1 p-6 rounded-md">
        <Input
          placeholder="Enter DOI"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        ></Input>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 mx-2 px-2 border rounded-md"
          onClick={handleArticleAdd}
        >
          Add Article
        </button>
      </div>
    </div>
  )
}
