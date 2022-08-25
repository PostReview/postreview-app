import { useMutation } from "next/data-client"
import logout from "app/auth/mutations/logout"
import React, { Fragment, useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Button } from "./Button"
import { Routes, useRouter } from "blitz"
import { Menu, Transition } from "@headlessui/react"
import { AvatarIcon } from "./AvatarIcon"

export const HeaderUserButton = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = async () => {
    await logoutMutation()
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="flex items-center">
      {currentUser ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <AvatarIcon currentUser={currentUser} onClick={handleClick} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-dark text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-violet-500 bg-green bg-opacity-25"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-violet-500 bg-green bg-opacity-25"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <>
          <button
            id="login-button"
            className="font-semibold mx-2 rounded-md px-3 py-2 whitespace-nowrap flex items-center justify-center text-gray-darkest dark:text-white bg-gray-light dark:bg-gray-medium hover:bg-gray-medium dark:hover:bg-gray-darkest hover:text-white"
            onClick={() => router.push(Routes.LoginPage())}
          >
            Log in
          </button>
          <Button id="login-button" onClick={() => router.push(Routes.SignupPage())}>
            Sign up
          </Button>
        </>
      )}
    </div>
  )
}
