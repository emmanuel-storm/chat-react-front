"use client";
import {Socket} from "socket.io-client";
import React, {useState} from "react";

export interface Props {
    socket: Socket;
    user: any;
}


const SendMessage = ({socket, user}: Props) => {
    const [text, setText] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const messageData = {
            content: text,
            timeSent: new Date().toISOString(),
            username: user.name,
        };

        socket.emit("chat-message", messageData);

        setText("");
    };

    return (
      <form onSubmit={handleSubmit}>
          <div className="flex items-center p-4 bg-gray-200 dark:bg-gray-700">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-gray-600 focus:outline-none"
                value={text}
                onChange={e => setText(e.target.value)}
              />
          </div>
      </form>
    )
}

export default SendMessage;