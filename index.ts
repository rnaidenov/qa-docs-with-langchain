import 'dotenv'
import readline from 'readline';
import { PineconeStore } from "@langchain/pinecone";
import { PineconeIndex } from "./utils/pinecone-index";
import { openAISetup } from "./utils/open-ai-setup";
import { createRAGChain } from "./utils/create-rag-chain";
import { composeConversationalContextChain } from './utils/compose-conversational-rag-chain';

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

const sessionId = 'test-session-id';
const conversationalRAGChain = await composeConversationalContextChain(sessionId, retrievalChain);

// Function to handle follow-up questions
const handleFollowUp = async (prevQuestion?: string) => {
  const questionToAsk = prevQuestion ?
    `Sorry, something went wrong with your question: "${prevQuestion}". Try asking again: (y / n)` :
    'What do you want to know about the documentation?';
  rl.question('\n\n> [SYSTEM]: ' + questionToAsk + '\n\n> [USER]: ', async (userResponse: string) => {
    if (userResponse.toLowerCase() === 'exit') {
      rl.close();
    } else if (userResponse.toLowerCase() === 'y' && typeof prevQuestion === 'string') {
      const answer = await conversationalRAGChain(prevQuestion);
      console.log('\n\n> [BOT]: ', answer);
      handleFollowUp();
    } else {
      try {
        const answer = await conversationalRAGChain(userResponse);
        console.log('\n\n> [BOT]: ', answer);
        handleFollowUp();
      } catch (error) {
        console.error(error);
        handleFollowUp(prevQuestion);
      }
    }
  });
};

// Start the follow-up question loop
handleFollowUp();
