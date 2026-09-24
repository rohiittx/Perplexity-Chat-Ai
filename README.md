# 🤖 AI Chat Application

An AI-powered conversational web application inspired by modern AI assistants like ChatGPT and Perplexity. The application uses **LangChain** to build and manage the AI agent workflow and **Gemini Flash Latest** as the underlying AI model.

The application provides a seamless conversational experience where users can create chats, continue conversations with contextual follow-up prompts, search the internet for up-to-date information, and access their previous conversations through persistent chat history.

## ✨ Features

* 💬 **Persistent Chat History**
  Saves users' conversations so they can access their previous chats anytime.

* 🔄 **Contextual Follow-up Conversations**
  Users can continue chatting within the same conversation while maintaining the context of previous messages.

* 🎨 **Unique & Modern UI**
  Clean and user-friendly interface designed specifically for an AI chat experience.

* 🔐 **Secure Authentication**
  JWT-based authentication system for secure user sessions.

* 📧 **Gmail Verification**
  Email verification using Nodemailer to verify user accounts during registration.

* 🌐 **Internet Search**
  Uses **Tavily** to search the internet and provide users with information from current web sources.

* 🏷️ **Automatic Chat Titles**
  Automatically generates a meaningful title for each conversation based on the user's chat.

* ⚡ **Real-time Communication**
  Socket.IO is used to support real-time communication between the client and server.

* 🧠 **AI Agent with LangChain**
  LangChain is used to create and manage the AI agent and its interaction with external tools such as web search.

## 🧠 AI Model

**Gemini Flash Latest**

The application uses Google's Gemini Flash model to generate AI responses, combined with LangChain for agent orchestration and tool integration.

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* Socket.IO

### AI & Search

* LangChain
* Gemini Flash Latest
* Tavily Search API

### Database

* MongoDB

### Authentication & Communication

* JSON Web Token (JWT)
* Nodemailer
* Socket.IO

## 🔄 Application Workflow

```text
User
  ↓
React.js Frontend
  ↓
Express.js Backend
  ↓
LangChain AI Agent
  ↓
Gemini Flash Latest
  ↓
 ┌───────────────────┐
 │                   │
 ▼                   ▼
Tavily Web Search   MongoDB
 │                   │
 ▼                   ▼
Internet Data      Chat History
 │
 └──────────┬────────┘
            ↓
      AI Generated Response
            ↓
      React.js Interface
```

## 🔑 Authentication Flow

The application uses **JWT-based authentication** to securely manage user sessions.

1. User creates an account.
2. Verification email is sent using Nodemailer.
3. User verifies their Gmail account.
4. Server generates a JWT token after successful authentication.
5. The token is used to authenticate protected API requests.

## 🌐 Web Search

The application can search the internet when a user's prompt requires current or external information.

**Tavily** is integrated with the LangChain agent, allowing the AI to use web search as an external tool and incorporate relevant information into its response.

## 💾 Chat Management

Each conversation is stored in MongoDB, allowing users to:

* Create new conversations
* Continue existing conversations
* Ask follow-up questions
* Access previous chat history
* Automatically generate titles for conversations

## 🚀 Key Highlights

This project demonstrates practical implementation of:

* AI Agent Architecture
* LLM Integration
* LangChain Tool Calling
* Web Search Integration
* Context-Aware Conversations
* Real-Time Communication
* JWT Authentication
* Email Verification
* MongoDB Data Persistence
* REST APIs
* React.js Frontend Development

## 📌 Technologies Used

**React.js • Express.js • Node.js • MongoDB • LangChain • Gemini Flash • Tavily • JWT • Socket.IO • Nodemailer**

---

### 🎯 Project Goal

The goal of this project is to build a modern AI conversational platform that combines **LLM-powered conversations, persistent chat history, contextual follow-ups, real-time communication, and internet search** into a single web application.

