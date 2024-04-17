// Run with: node ollama-sentiment.js
// Description: Analyze the sentiment of a given text using Ollama.
const { Ollama } = require("@langchain/community/llms/ollama");

// Initialize Ollama with the default settings
const ollama = new Ollama({
  baseUrl: "http://localhost:11434", // Ensure Ollama server is running at this URL
  model: "llama2", // Adjust model as needed
});
// Function to analyze the sentiment of a given text
async function analyzeSentiment(text) {
  const stream = await ollama.stream(
    `Analyze the sentiment of this text: "${text}"`
  );
  // Collect the chunks of the stream
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  console.log("Sentiment Analysis Result:", chunks.join(""));
}

// Replace the string below with any text you want to analyze
analyzeSentiment("I love this product!");
