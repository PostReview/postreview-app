import React from "react"
import { invoke, useMutation, useRouter } from "blitz"
import { Autocomplete } from "./Autocomplete"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import SearchResultArticle from "./SearchResultArticle"
import { cleanCrossRefItem } from "../cleanCrossRefItem"
import getArticleByDoi from "app/queries/getArticleByDoi"
import addArticle from "app/mutations/addArticle"
import SearchResultUser from "./SearchResultUser"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_SEARCH_KEY as string
)

export default function EnterDOI(props) {
  const { session } = props
  const router = useRouter()
  const [addArticleMutation] = useMutation(addArticle)

  async function handleArticleAdd(newArticle) {
    // Check if the article already exists in our database
    const existingArticle = await invoke(getArticleByDoi, newArticle.doi)
    // If the article is already in there, go to the existing article
    if (existingArticle) router.push(`/articles/${existingArticle.id}`)

    // If the article is new, push to our database
    const addedArticle = await invoke(addArticleMutation, {
      addedById: session?.userId || undefined,
      authorString: newArticle.authors,
      ...newArticle,
    })
    // Go to the newly added article
    router.push(`/articles/${addedArticle.id}`)
  }

  // Prepare debounce to wait before querying CrossRef
  function debouncePromise(fn, time) {
    let timerId = undefined
    return function debounced(...args) {
      if (timerId) {
        clearTimeout(timerId)
      }

      return new Promise((resolve) => {
        timerId = setTimeout(() => resolve(fn(...args)), time) as any
      })
    }
  }
  const debounced = debouncePromise((items) => Promise.resolve(items), 100)

  return (
    <div className="m-1 flex max-w-7xl flex-grow flex-row items-center justify-end rounded-md">
      <Autocomplete
        placeholder="Search Title, Author, DOI"
        openOnFocus={false}
        getSources={({ query }) => {
          // If the input is a DOI, return the specific paper
          // `https://api.crossref.org/works/${matchedDOI}`
          const matchedDOI = query?.match(/10.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i)

          if (matchedDOI) {
            return fetch(
              `https://api.crossref.org/works/${encodeURIComponent(
                matchedDOI
              )}&mailto=info@postreview.org`
            )
              .then((response) => response.json())
              .then(({ message }) => {
                return [
                  {
                    sourceId: "undefined",
                    onSelect() {
                      const currentItem = cleanCrossRefItem(message)
                      handleArticleAdd(currentItem)
                    },
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
          return [
            {
              // Look for papers already in our database
              sourceId: "products",
              async onSelect(params) {
                const { item, setQuery } = params
                if (item.__autocomplete_indexName.match(/_articles/g)) {
                  router.push(`/articles/${item.objectID}`)
                }
                if (item.__autocomplete_indexName.match(/_users/g)) {
                  router.push(`/profiles/${item.handle}`)
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
                    {
                      indexName: `${process.env.ALGOLIA_PREFIX}_users`,
                      query,
                    },
                  ],
                })
              },
              templates: {
                item({ item, components }) {
                  return (
                    <>
                      {item.__autocomplete_indexName.match(/_articles/g) && (
                        <SearchResultArticle item={item} components={components} />
                      )}

                      {item.__autocomplete_indexName.match(/_users/g) && (
                        <SearchResultUser item={item} components={components} />
                      )}
                    </>
                  )
                },
              },
            },
            {
              // Look for papers in CrossRef
              sourceId: "crossRef",
              onSelect(params) {
                const { item, setQuery } = params
                const currentItem = cleanCrossRefItem(item)
                handleArticleAdd(currentItem)
              },
              getItems() {
                return debounced(
                  fetch(
                    `https://api.crossref.org/works?query.bibliographic=${encodeURIComponent(
                      query
                    )}&select=title,author,published,DOI&rows=10&mailto=info@postreview.org`
                  )
                    .then((response) => response.json())
                    .then(({ message }) => {
                      // Filter out items
                      const filteredItems = message.items
                        // filter out items without titles (Ex. "vegetab" returning items without titles)
                        .filter((item) => item.title)
                        // filter out items without published dates
                        .filter((item) => item.published?.["date-parts"])
                      return filteredItems
                    })
                    .catch(() => [])
                )
              },
              getItemInputValue({ item }) {
                return item.description
              },
              templates: {
                item({ item, components }) {
                  const currentItem = cleanCrossRefItem(item)
                  return <SearchResultArticle item={currentItem} components={components} />
                },
              },
            },
          ]
        }}
      />
    </div>
  )
}
