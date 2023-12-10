"use client"
import React, {useEffect, useState} from "react"
import {io} from "socket.io-client"
import SendMessage from "@/components/chat/SendMessage"
import Messages from "@/components/chat/Messages"
import AddUser from "@/components/chat/AddUser"

const socket = io("http://localhost:3001")

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState({id: "undefined", name: "undefined"})
    const [ translateMessage, setTranslateMessage ] = useState("")
    const [ validateMessage, setValidateMessage ] = useState("")

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected')
        });

        const handleMessage = (data) => {
            console.log('Received message:', data);
            setMessages((msg) => {
                return [...msg, data];
            });
        };

        socket.on('chat-message', handleMessage);

        socket.on('get-user', (data) => {
            setUser(data)
        });

        socket.on("chat-translate-message", (data) => {
            console.log(data)
            setTranslateMessage(data.content)
        });

        socket.on("chat-validate-message", (data) => {
            console.log({ validateMessage: data })
            setValidateMessage(data.content);
        });

        return () => {
            socket.off('chat-message', handleMessage);
        };

    }, [user])

    return (
      <>
          <div className="flex flex-col h-screen">
              <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                  <Messages messages={messages} user={user}/>
              </div>
              {(translateMessage || validateMessage) && (
                <div className="p-4 bg-gray-200 dark:bg-gray-700">
                    <p className="text-sm text-gray-500">translation : {translateMessage}</p>
                    <p className="text-sm text-gray-500">validation : {validateMessage}</p>
                </div>
              )}
              <AddUser socket={socket}/>
              <SendMessage socket={socket} user={user}/>
          </div>
      </>
    );
};

export default Chat;