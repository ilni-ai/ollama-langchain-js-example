// Run: node ollama-example.js
const Ollama = require("@langchain/community/llms/ollama").Ollama;
// Create a new Ollama instance 
const ollama = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2", // Default value
});
// Translate a sentence
async function translate() {
  const stream = await ollama.stream(
    `Translate "I love programming" into German.`
  );
  // Collect the chunks of the stream
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  console.log(chunks.join(""));
}
// Call the translate function
translate();
