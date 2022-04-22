import React, { useState } from "react"
import { useRouter } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Dialog } from "@mui/material"
import { Autocomplete } from "./Autocomplete"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import SearchResultArticle from "./SearchResultArticle"
import "@algolia/autocomplete-theme-classic"
import AddPaperPopup from "./AddPaperPopup"
import { Button } from "./Button"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_SEARCH_KEY as string
)

export default function EnterDOI() {
  const currentUser = useCurrentUser()
  const [isPaperPopupOpen, setPaperPopupOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="m-1 rounded-md flex flex-row items-center flex-grow max-w-7xl justify-end">
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => {
          return [
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
                  return <SearchResultArticle item={item} components={components} />
                },
                noResults() {
                  return (
                    <div>
                      No results.{" "}
                      {currentUser ? (
                        <a
                          className="text-violet-500 hover:cursor-pointer"
                          onClick={() => setPaperPopupOpen(true)}
                        >
                          Add a new paper
                        </a>
                      ) : (
                        <span>
                          <a
                            className="text-violet-500 hover:cursor-pointer"
                            href={"/api/auth/google"}
                          >
                            Login or create an account
                          </a>{" "}
                          to add papers.
                        </span>
                      )}
                    </div>
                  )
                },
              },
            },
          ]
        }}
      />
      {currentUser ? <Button onClick={() => setPaperPopupOpen(true)}>+ Add Paper</Button> : ""}
      <Dialog open={isPaperPopupOpen} onClose={() => setPaperPopupOpen(false)}>
        <AddPaperPopup setPaperPopupOpen={setPaperPopupOpen} />
      </Dialog>
    </div>
  )
}
