import React, { useState } from "react"
import { invoke, useMutation, useQuery, useRouter } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Dialog } from "@mui/material"
import { Autocomplete } from "./Autocomplete"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import SearchResultArticle from "./SearchResultArticle"
import "@algolia/autocomplete-theme-classic"
import AddPaperPopup from "./AddPaperPopup"
import { Button } from "./Button"
import { cleanCrossRefItem } from "../cleanCrossRefItem"
import getArticleByDoi from "app/queries/getArticleByDoi"
import addArticle from "app/mutations/addArticle"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_SEARCH_KEY as string
)

export default function EnterDOI() {
  const currentUser = useCurrentUser()
  const [isPaperPopupOpen, setPaperPopupOpen] = useState(false)
  const router = useRouter()
  const [addArticleMutation] = useMutation(addArticle)

  async function handleArticleAdd(newArticle) {
    // push to our database
    const addedArticle = await invoke(addArticleMutation, {
      addedById: currentUser?.id,
      authorString: newArticle.authors,
      ...newArticle,
    })
    // go to the added article
    router.push(`/articles/${addedArticle.id}`)
  }

  return (
    <div className="m-1 rounded-md flex flex-row items-center flex-grow max-w-7xl justify-end">
      <Autocomplete
        placeholder="Subject, title, author, keyword, DOI"
        openOnFocus={true}
        getSources={({ query }) => {
          // If the input is a DOI, return the specific paper
          // `https://api.crossref.org/works/${matchedDOI}`
          const matchedDOI = query?.match(/10.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i)

          if (matchedDOI) {
            return fetch(`https://api.crossref.org/works/${encodeURIComponent(matchedDOI)}`)
              .then((response) => response.json())
              .then(({ message }) => {
                return [
                  {
                    sourceId: "undefined",
                    getItems() {
                      return [{ item: undefined }]
                    },
                    templates: {
                      item() {
                        const currentItem = cleanCrossRefItem(message)
                        return <SearchResultArticle item={currentItem} components={undefined} />
                      },
                    },
                  },
                ]
              })
          }
          // If the input is not a DOI, query the CrossRef endpoint
          return fetch(
            `https://api.crossref.org/works/?query=${encodeURIComponent(
              query
            )}&select=title,author,published,DOI&rows=5`
          )
            .then((response) => response.json())
            .then(({ message }) => {
              return [
                {
                  // Look for papers already in our database
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
                      return <SearchResultArticle item={item} components={components} />
                    },
                  },
                },
                {
                  // Look for papers in CrossRef
                  sourceId: "message",
                  onSelect(params) {
                    const { item, setQuery } = params
                    const currentItem = cleanCrossRefItem(item)
                    const foundPaper = invoke(getArticleByDoi, currentItem.doi).then((paper) => {
                      // If the paper is not in our database, add the paper and then go to that paper
                      if (!paper) return handleArticleAdd(currentItem)
                      // If the paper is in our database, go to that paper
                      router.push(`/articles/${paper.id}`)
                    })
                  },
                  getItems() {
                    // Filter out items
                    const filteredItems = message.items
                      // filter out items without titles (Ex. "vegetab" returning items without titles)
                      .filter((item) => item.title)
                      // filter out items without published dates
                      .filter((item) => item.published?.["date-parts"])
                    return filteredItems
                  },
                  getItemInputValue({ item }) {
                    return item.description
                  },
                  templates: {
                    item({ item, components }) {
                      const currentItem = cleanCrossRefItem(item)
                      return (
                        <div className="my-1 mx-1 flex">
                          <div className="mr-2">
                            {components && (
                              <components.Highlight hit={currentItem} attribute="title" />
                            )}
                          </div>
                          <div>
                            <p className="text-md font-normal leading-4 text-gray-500 dark:text-gray-400">
                              {currentItem?.authors}{" "}
                              {currentItem.publishedYear && `(${currentItem.publishedYear})`}
                            </p>
                          </div>
                        </div>
                      )
                    },
                  },
                },
              ]
            })
        }}
      />
      {currentUser ? <Button onClick={() => setPaperPopupOpen(true)}>+ Add Paper</Button> : ""}
      <Dialog open={isPaperPopupOpen} onClose={() => setPaperPopupOpen(false)}>
        <AddPaperPopup setPaperPopupOpen={setPaperPopupOpen} />
      </Dialog>
    </div>
  )
}
