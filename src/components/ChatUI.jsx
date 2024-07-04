import React, { useState } from 'react';
import '../App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = process.env.API_KEYONE;

export default function ChatUI() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([]);

    const handleSend = async (message) => {
        const newMessage = {
          message: message,
          sender: "user",
          direction: "outgoing"
        };
    
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
    
        setTyping(true);
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if(messageObject.sender === "ChatGPT") {
            role="assistant"
          } else {
            role="user"
          } 
          return { role: role, content: messageObject.message }
        });
    
        const systemMessage = {
          role: "system",
          content: "Explain all concepts like I am 10 years old."
        };
    
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [systemMessage, ...apiMessages]
        };
    
        await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          setMessages([
            ...chatMessages, {
              message: data.choices[0].message.content,
              sender: "ChatGPT"
            }
          ]);
          setTyping(false);
        });
      }

  return (
    <div>
      <div style={{ position: "relative", height: "600px", width: "100%" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList scrollBehavior="smooth" typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}>
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}
