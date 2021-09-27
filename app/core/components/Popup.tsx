import React from "react"

const Popup = (props) => {
  const { className, xbutton } = props
  return (
    <div
      className={`fixed flex justify-center bg-gray-300 bg-opacity-50 w-screen h-screen top-0 left-0`}
    >
      <div
        className={`relative w-3/5 h-2/5 p-6 mt-60 mx-20 border-2 bg-white rounded-lg overflow-auto ${className}`}
      >
        {xbutton ? (
          <span
            className="fixed cursor-pointer right-52 top-56 rounded-full border-2 bg-gray-100 text-center hover:bg-gray-200 h-8 w-8 flex items-center justify-center"
            onClick={props.handleClose}
          >
            &times;
          </span>
        ) : undefined}

        {props.content}
      </div>
    </div>
  )
}

export default Popup
