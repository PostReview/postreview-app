// Parse author array from Cross Ref
// to one author string, formatted in the APA-like style
export const parseAuthors = (author, i, authors) => {
  // If the author name is a string "undefined", set as undefined
  if (author.given === "undefined" || author.family === "undefined") return undefined

  return `${author.family}, ${author.given}`
}
