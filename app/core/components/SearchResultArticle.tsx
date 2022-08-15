const SearchResultArticle = ({ item, components }) => {
  return (
    <>
      <div className="my-1 mx-1 flex-col">
        <div className="mr-2">
          {item.title}
          <components.Highlight hit={item} attribute="name" />
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item?.authors} {item.publishedYear && `(${item.publishedYear})`}
          </p>
        </div>
      </div>
    </>
  )
}

export default SearchResultArticle
