import { App } from "bun";
import 'dotenv'
import readline from 'readline';
import { PineconeStore } from "@langchain/pinecone";
import { PineconeIndex } from "./utils/pinecone-index";
import { openAISetup } from "./utils/open-ai-setup";
import { createRAGChain } from "./utils/create-rag-chain";
import { composeConversationalContextChain } from './utils/compose-conversational-rag-chain';
import { ChatMessageHistory } from 'langchain/memory';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { model, embeddings } = openAISetup();

const pineconeIndex = PineconeIndex.RagApp;


// Retrieval
const vectorStore = await PineconeStore.fromExistingIndex(
  embeddings,
  { pineconeIndex }
);

const retriever = vectorStore.asRetriever();

const retrievalChain = await createRAGChain(model, retriever);

// const sessionId = 'test-session-id';

// Session histories
// => This is where we'll store the input / output messages per sessionId
const messageHistories = {} as Record<string, ChatMessageHistory>;
// const conversationalRAGChain = await composeConversationalContextChain(sessionId, messageHistory, retrievalChain);

const getMessageHistoryForSession = (sessionId: string) => {
  if (messageHistories[sessionId] !== undefined) {
    return messageHistories[sessionId];
  }
  const newChatSessionHistory = new ChatMessageHistory();
  messageHistories[sessionId] = newChatSessionHistory;
  return newChatSessionHistory;
}

// Function to handle follow-up questions
// const handleFollowUp = async (prevQuestion?: string) => {
//   const questionToAsk = prevQuestion ?
//     `Sorry, something went wrong with your question: "${prevQuestion}". Try asking again: (y / n)` :
//     'What do you want to know about the documentation?';
//   rl.question('\n\n> [SYSTEM]: ' + questionToAsk + '\n\n> [USER]: ', async (userResponse: string) => {
//     if (userResponse.toLowerCase() === 'exit') {
//       rl.close();
//     } else if (userResponse.toLowerCase() === 'y' && typeof prevQuestion === 'string') {
//       const answer = await conversationalRAGChain(prevQuestion);
//       console.log('\n\n> [BOT]: ', answer);
//       handleFollowUp();
//     } else {
//       try {
//         const answer = await conversationalRAGChain(userResponse);
//         console.log('\n\n> [BOT]: ', answer);
//         handleFollowUp();
//       } catch (error) {
//         console.error(error);
//         handleFollowUp(prevQuestion);
//       }
//     }
//   });
// };

// Start the follow-up question loop
// handleFollowUp();

const handleResponse = async (sessionId: string, question: string): Promise<string> => {
  try {
    const messageHistory = getMessageHistoryForSession(sessionId);
    console.log("🚀 ~ fetch ~ messageHistory:", messageHistory)
    const conversationalRAGChain = await composeConversationalContextChain(
      sessionId, messageHistory, retrievalChain
    );

    return conversationalRAGChain(question);
  } catch (error) {
    console.error('kur');
    console.error(error);
    return await handleResponse(sessionId, question);
  }
}

Bun.serve({
  port: 8081,
  async fetch(request, server) {
    try {
      // TODO: Worth validating
      const body = await request.json() as { sessionId: string, question: string }
      const { sessionId, question } = body;

      const answer = await handleResponse(sessionId, question);

      return Response.json({ success: true, data: answer });
    } catch (error) {
      console.error(error);
      return Response.error();
    }
  }
});
