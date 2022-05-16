import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_articles`)
const algoliaPrefix = process.env.ALGOLIA_PREFIX

export const createReplica = async () => {
  const targetScores = [
    "ratingsCount",
    "ratingTotal",
    "ratingRQ",
    "ratingDesign",
    "ratingFindings",
    "ratingFindings",
    "ratingInterpretation",
    "ratingSignificance",
  ]

  const articleReplicas = targetScores.map((suffix) => `${algoliaPrefix}_articles_${suffix}`)

  const result = await index
    .setSettings({
      replicas: articleReplicas,
    })
    .then(() => {
      return "success"
    })
    .catch((e) => {
      return e
    })

  targetScores.map((suffix) => {
    const currentIndex = client.initIndex(`${algoliaPrefix}_articles_${suffix}`)
    currentIndex.setSettings({
      ranking: [
        `desc(${suffix})`,
        "typo",
        "geo",
        "words",
        "filters",
        "proximity",
        "attribute",
        "exact",
        "custom",
      ],
    })
  })

  return result
}

export default createReplica
