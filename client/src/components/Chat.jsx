import React, { useState } from "react";

export default function Chat() {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState("");

  const handleChange = (e) => {
    setChat(e.target.value);
  };

  const chats = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (chat !== "") {
        const chatObj = {chat}
      chats.push(JSON.stringify(chatObj));
      localStorage.setItem("localChats", chats);
      setMessages(chat);
    }
  };

  const happyChats = localStorage.getItem("localChats")
  console.log(happyChats)

  return (
    <div>
      <div className="chat">
        <div className="messages">
            {/* {
                happyChats !== null ? happyChats.map((index) => {
                    <p>{index}</p>
                }) : null
            } */}
        </div>
      </div>
      <div className="chat-form">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Message"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
