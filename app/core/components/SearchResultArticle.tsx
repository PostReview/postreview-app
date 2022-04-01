const SearchResultArticle = ({ item, components }) => {
  return (
    <>
      <div className="my-1 mx-1 flex">
        <div className="mr-2">
          {components ? <components.Highlight hit={item} attribute="name" /> : undefined}
        </div>
        <div>
          <p className="text-md font-normal leading-4 text-gray-500 dark:text-gray-400">
            {item.authors} ({item.publishedYear})
          </p>
        </div>
      </div>
    </>
  )
}

export default SearchResultArticle
