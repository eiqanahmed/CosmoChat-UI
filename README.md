# Project Description: 
CosmoChat-UI is a user interface for a chatbot similar to ChatGPT, built using OpenAI's API. It allows users to interact with an AI-powered chatbot for various tasks such as answering questions, generating text, and providing conversational responses.

# Installation: 
### Prerequisites
- Node.js (version 22.1.0)
- npm (version 10.8.0)

### Clone the Repository
- git clone https://github.com/yourusername/cosmochat-ui.git
- cd cosmochat-ui

Install the dependencies using the command: npm install

# Usage:
Use the command 'npm start'. Open your browser and navigate to http://localhost:3000 to use the chat interface (This should open automatically once npm start is run, but if it doesnt, type the link above into your browser).

# Features:
- Interactive chat interface similar to ChatGPT
- Real-time responses using OpenAI's API
- User-friendly design and easy navigation
- The depth of the responses can be controlled by the user (See Configuration)
- Configurable settings for API keys and other parameters

# Configuration: 
### Setting up the OpenAI API Key:
- Add your OpenAI API key to the `.env` file in the root directory of the project

### Controlling the depth of the responses:
- Change the value of the content key of the 'systemMessage' object in components/ChatUI.



