"use client";
import {Socket} from "socket.io-client";
import React, {useState} from "react";

export interface Props {
    socket: Socket;
}

const AddUser = ({socket}: Props) => {
    const [username, setUsername] = useState("")
    const [displayUserNameInput, setDisplayUserNameInput] = React.useState(true)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("add-user", {
            username: username,
        });

        setDisplayUserNameInput(false)
    }

    return (
      <form onSubmit={handleSubmit}>
        {displayUserNameInput && (
          <div className="flex items-center p-4 bg-gray-200 dark:bg-gray-700">
              <input
                type="text"
                placeholder="Set a username..."
                className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-gray-600 focus:outline-none"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full bg-white hover:bg-blue-100 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none"
              >
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
              </button>
          </div>
        )}
      </form>
    )
}

export default AddUser;