
const decoder = new TextDecoder();

// readChunks() reads from the provided reader and yields the results into an async iterable
function readChunks(reader: any) {
  return {
    async*[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield decoder.decode(readResult.value);
        readResult = await reader.read();
      }
    },
  };
}

const sleep = async () => {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

const response = await fetch(`http://localhost:${8081}`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    question: "What is the document about?",
    sessionId: "2",
  })
});

// response.body is a ReadableStream
const reader = response.body?.getReader();

for await (const chunk of readChunks(reader)) {
  console.log("CHUNK:", chunk);
}

await sleep();