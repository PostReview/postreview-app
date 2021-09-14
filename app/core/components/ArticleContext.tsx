import React from "react"
import axios from "axios"

export default function ArticleContext() {
  const defaultDoi = "10.3390/publications7020040"

  const [doi, setDoi] = useState(defaultDoi)
  const [articles, setArticles] = useState(defaultArticles)

  //   Initialize Local Storage
  useEffect(() => {
    const articleJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (articleJSON != null) setArticles(JSON.parse(articleJSON))
    // Only do this once = empty arrayy
  }, [])
  // saving the data to local storage when articles changes (setItem)
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles))
  }, [articles])
  function handleArticleNotFound() {
    return null
  }

  function handleArticleDelete(id) {
    setArticles(articles.filter((article) => article.id !== id))
  }
  //   Context Functions to be passed to children
  const ArticleContextValue = {
    handleArticleDelete,
  }

  const ArticleContext = React.createContext()

  async function getArticleMetadata() {
    try {
      const doiURL = "https://api.crossref.org/works/" + doi
      const response = await axios.get(doiURL)
      const newArticleMetadata = response.data.message
      const plauditData = await getPlauditMetadata() //   Get plaudit data and inject to new article
      //   const plauditData = null
      const plauditNumEvents = plauditData?.events?.length
      const newArticle = {
        id: uuidv4(),
        metadata: newArticleMetadata,
        plaudit_count: plauditNumEvents,
      }

      setArticles([newArticle, ...articles])
    } catch {
      handleArticleNotFound()
    }
  }

  async function getPlauditMetadata() {
    try {
      const crossrefEventURL = `https://api.eventdata.crossref.org/v1/events?obj-id=${doi}&source=plaudit`
      const crossrefEventResponse = await axios.get(crossrefEventURL)
      return crossrefEventResponse.data.message
    } catch {
      handleArticleNotFound()
    }
  }

  return <div></div>
}
