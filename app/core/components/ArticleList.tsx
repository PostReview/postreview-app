import React, { Suspense } from "react"
import { Head, useQuery } from "blitz"
import Article from "./Article"
import getArticlesWithReview from "app/queries/getArticlesWithReview"
import algoliasearch from "algoliasearch"
import {
  InstantSearch,
  SortBy,
  Hits,
  Configure,
} from "react-instantsearch-hooks-web"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_SEARCH_KEY as string
)

export default function ArticleList() {
  const [defaultArticles] = useQuery(getArticlesWithReview, undefined)
  const Hit = ({ hit }) => {
    return (
      <Suspense fallback="loading" key={hit.objectID}>
        <Article
          key={hit.objectID}
          id={hit.objectID}
          authorString={hit.authors}
          doi={hit.doi}
          title={hit.name}
          publishedYear={hit.publishedYear}
          ratingTotal={hit.ratingTotal}
          ratingRQ={hit.ratingRQ}
          ratingDesign={hit.ratingDesign}
          ratingFindings={hit.ratingFindings}
          ratingInterpretation={hit.ratingInterpretation}
          ratingSignificance={hit.ratingSignificance}
          ratingsCount={hit.ratingsCount}
        />
      </Suspense>
    )
  }


  const targetScores = [
    { label: "Review score", suffix: "ratingTotal" },
    { label: "Date added", suffix: "dateAdded" },
  ]

  const defaultSortItem = [{ label: "Number of reviews", value: `${process.env.ALGOLIA_PREFIX}_articles` }]
  const sortItems = defaultSortItem.concat(
    targetScores.map((target) => {
      return {
        label: target.label,
        value: `${process.env.ALGOLIA_PREFIX}_articles_${target.suffix}`,
      }
    })
  )
  if (!defaultArticles) return null
  return (
    <div className="">
      <InstantSearch
        indexName={`${process.env.ALGOLIA_PREFIX}_articles`}
        searchClient={searchClient}
      >
        <Configure filters="ratingsCount > 0"></Configure>

        <div className="">
          <div>
            <div className="flex flex-row mt-8 ml-4">
              <span className="mx-2 text-gray-medium">Sort by</span>
              <SortBy items={sortItems} />
            </div>
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}
