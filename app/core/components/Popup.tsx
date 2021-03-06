import React from "react"

const Popup = (props) => {
  const { className, xbutton } = props
  return (
    <>
      <div
        className={`fixed bg-gray-300 bg-opacity-50 w-screen h-screen top-0 left-0`}
        onClick={props.handleClose}
      ></div>
      <div
        className={`fixed
        top-6 bottom-0 p-6 mt-4 mx-20 border-2 bg-white overflow-auto rounded-lg ${className}`}
      >
        {xbutton ? (
          <span
            className="cursor-pointer right-52 top-56 rounded-full border-2 bg-gray-100 text-center hover:bg-gray-200 h-8 w-8 flex items-center justify-center"
            onClick={props.handleClose}
          >
            &times;
          </span>
        ) : undefined}

        {props.content}
      </div>
    </>
  )
}

export default Popup
