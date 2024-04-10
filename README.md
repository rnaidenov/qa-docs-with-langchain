# qa-docs-with-langchain

This is a POC chatbot that retrieves information from documents to answer user queries. It uses Langchain for conversational AI and Pinecone for vector search.

## System Requirements
- Node.js
- Bun runtime v1.0.2 or higher
- OpenAI API key (set as an environment variable)
- Pinecone API key (set as an environment variable)

## Installation
To install dependencies, run the following command:

`bun install`

## Running the Chatbot
To run the chatbot, ensure you have set up the necessary environment variables, including the OpenAI and Pinecone API keys.

To run the chatbot:

`bun run index.ts`

## Environment Variables
Create a `.env` file in the root directory and add the following:

OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
