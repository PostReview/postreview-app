// Parse author array from Cross Ref
// to one author string, formatted in the APA-like style
export const parseAuthors = (author, i, authors) => {
  if (authors.length - 1 === i) {
    /* If last author, do not print the semicolon */
    return `${author.family}, ${author.given}`
  } else {
    return `${author.family}, ${author.given}; `
  }
}
