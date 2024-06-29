import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY1 = "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";
const API_KEY = "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";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hello I am ChatGPT", sender: "ChatGPT", direction: "incoming" }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);
    // Process message to ChatGPT asynchronously here
    // Example: await processMessageToChatGPT(message);
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

    // role: "user" -> a message from the user, "assistant" -> a response from ChatGPT
    // "system" -> generally one initial message defining HOW we want ChatGPT to talk/respond

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old."
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage,
        ...apiMessages
      ]
    }

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
      console.log(data);
      // console.log(data.choices[0].message.content)
    });

  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList typingIndicator={typing? <TypingIndicator content="ChatGPT is typing" /> : null}>
              {messages.map((message, i) => (
                // Use a unique key instead of index (i.e., message.id)
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
