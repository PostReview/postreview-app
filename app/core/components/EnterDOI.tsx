import React, { useState } from "react"
import { invoke, useMutation, useRouter } from "blitz"
import addArticle from "../../mutations/addArticle"
import getArticleByDoi from "../../queries/getArticleByDoi"
import axios from "axios"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { v4 as uuidv4 } from "uuid"
import { Input, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"
import { Autocomplete } from "./Autocomplete"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import SearchResultArticle from "./SearchResultArticle"
import "@algolia/autocomplete-theme-classic"

// const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_SEARCH_KEY!)

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_SEARCH_KEY as string
)

export default function EnterDOI() {
  const currentUser = useCurrentUser()
  const defaultDoi = ""
  const [doi, setDoi] = useState(defaultDoi)
  const [addArticleMutation] = useMutation(addArticle)

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

  async function parseArticleMetadata(newArticleMetadata) {
    const newArticle = {
      id: uuidv4(),
      title: newArticleMetadata.title[0],
      doi: newArticleMetadata.DOI,
      publishedYear: newArticleMetadata.created["date-parts"][0][0],
      journal: newArticleMetadata["container-title"][0],
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
        .join(""),
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
    if (existingArticle) return router.push("/articles/" + existingArticle.id)
    // push to database
    const addedArticle = await invoke(addArticleMutation, { ...newArticle })
    // go to the added article
    router.push(`/articles/${addedArticle.id}`)
    // add authors - implement with Nested Writes in the future
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
  }

  function handleArticleNotFound() {
    window.alert("Article not found")
  }

  return (
    <div className="m-1 rounded-md flex flex-row items-center min-w-full justify-end">
      <Autocomplete
        className="h-full"
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: "products",
            async onSelect(params) {
              const { item, setQuery } = params
              if (item.objectID) {
                router.push(`/articles/${item.objectID}`)
              }
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: `${process.env.ALGOLIA_PREFIX}_articles`,
                    query,
                  },
                ],
              })
            },
            templates: {
              item({ item, components }) {
                return (
                  <>
                    {item.__autocomplete_indexName.match(/articles/g) ? (
                      <SearchResultArticle item={item} />
                    ) : (
                      <div className="my-1 mx-1 flex">
                        <div className="mr-2">{item.name}</div>
                        <div>
                          <p className="text-md font-normal leading-4 text-gray-500 dark:text-gray-400">
                            asdfasdfas
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )
              },
            },
          },
        ]}
      />
    </div>
  )
}
