import { parseAuthors } from "./parseAuthors"

export const cleanCrossRefItem = (item) => {
  // Set the doi of the article
  const cleanedItem = {
    title: item?.title?.[0],
    publishedYear: item?.published?.["date-parts"]?.[0]?.[0],
    authors: item?.author
      ? item?.author
          .map(parseAuthors)
          .filter((i) => i)
          .join("; ")
      : "",
    doi: item?.DOI,
  }

  return cleanedItem
}
