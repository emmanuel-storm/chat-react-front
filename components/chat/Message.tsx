import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"
import Image from "next/image"

export interface IMessage {
  content: string;
  timeSent: string;
  userName: string;
}

interface MessageProps {
  message: IMessage;
  user: any;
}

const socket = io("http://localhost:3001")

const Message = ({message, user}: MessageProps) => {
  const isCurrentUser = message.username === user.name

  const onTranslateMessage = () => {
    console.log("message", message.content)
    socket.emit("chat-translate-message", {
      content: message.content,
    });
  }

  const onValidateMessage = () => {
    console.log("validate", message.content)
    socket.emit("chat-validate-message", {
      messageToValidate: message.content,
      username: user.name,
    })
  }

  return (
    <>
      <div className={`${isCurrentUser ? 'flex flex-col mb-4 items-end' : 'flex flex-col mb-4 items-start'}`}
           key={message.timeSent}>
        <div
          className={`${isCurrentUser ? 'text-white rounded-lg p-3 max-w-xs break-words self-end bg-blue-500' : 'bg-white text-gray-800 rounded-lg p-3 max-w-xs break-words'}`}>
          {message.content}
        </div>
        <p className={`text-xs ${isCurrentUser ? 'text-right' : 'text-left'} text-gray-500`}>
          {message.username || "Undefined"} - {message.timeSent}
        </p>
        <div className="flex flex-row">
          <button
            type="button" onClick={onTranslateMessage}
            className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full bg-white hover:bg-blue-100 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none"
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
          <button
            type="button" onClick={onValidateMessage}
            className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full bg-white hover:bg-blue-100 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none"
          >
            <Image
              src="/check-circle-solid.svg"
              alt=""
              width="30"
              height="30"
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Message;
