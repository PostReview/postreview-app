import React, { Suspense } from "react"
import { Head, useQuery } from "blitz"
import Article from "./Article"
import getArticlesWithReview from "app/queries/getArticlesWithReview"
import algoliasearch from "algoliasearch"
import {
  InstantSearch,
  SortBy,
  Hits,
  SearchBox,
  Pagination,
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

  const targetScores = [
    { label: "Number of Ratings", suffix: "ratingsCount" },
    { label: "Total Rating", suffix: "ratingTotal" },
    { label: "Research Question", suffix: "ratingRQ" },
    { label: "Design", suffix: "ratingDesign" },
    { label: "Findings", suffix: "ratingFindings" },
    { label: "Interpretation", suffix: "ratingInterpretation" },
    { label: "Significance", suffix: "ratingSignificance" },
  ]

  const defaultSortItem = [{ label: "Recent", value: `${process.env.ALGOLIA_PREFIX}_articles` }]
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
    <div className="mt-10 mx-2">
      <Head>
        {/* Using Stellite CSS for now. TODO: Style the search results. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
          integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
          crossOrigin="anonymous"
        />
      </Head>
      <InstantSearch
        indexName={`${process.env.ALGOLIA_PREFIX}_articles`}
        searchClient={searchClient}
      >
        <Configure filters="ratingsCount > 0"></Configure>

        <div className="">
          <div>
            <SearchBox />
            <div className="flex flex-row items-center justify-end my-4">
              <span className="mx-2 text-gray-400">Sort by</span>
              <SortBy items={sortItems} />
            </div>
            <Hits hitComponent={Hit} className="" />
          </div>
        </div>
        <Pagination />
      </InstantSearch>
    </div>
  )
}
