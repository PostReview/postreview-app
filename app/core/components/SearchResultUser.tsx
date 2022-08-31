import { Image } from "blitz"

const SearchResultUser = ({ item, components }) => {
  return (
    <>
      <div className="my-1 mx-1 flex flex-row">
        <div id="avatar">
          <Image src={item.icon} alt="avatar icon" width={30} height={30} />
        </div>
        <div id="user-metadata" className="flex flex-col ml-3">
          <div>{item?.displayName}</div>
          <div className="text-gray-dark text-sm">{`@${item?.handle}`}</div>
        </div>
      </div>
    </>
  )
}

export default SearchResultUser
