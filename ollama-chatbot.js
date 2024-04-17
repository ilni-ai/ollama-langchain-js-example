const { Ollama } = require("@langchain/community/llms/ollama");
const readline = require("readline");

// Initialize Ollama with the default settings
const ollama = new Ollama({
  baseUrl: "http://localhost:11434", // Ensure Ollama server is running at this URL
  model: "llama2", // Adjust model as needed
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to handle sending and receiving messages to/from Ollama
async function chatWithOllama(prompt) {
  const stream = await ollama.stream(prompt);

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return chunks.join("");
}

// Start chatting with the user
function startChat() {
  rl.question("You: ", async (userInput) => {
    // Send user input to Ollama and get a response
    const response = await chatWithOllama(userInput);
    console.log(`Ollama: ${response}`);

    // Continue the conversation or exit
    if (userInput.toLowerCase() === "exit") {
      rl.close();
    } else {
      startChat(); // Loop back to continue chatting
    }
  });
}

// Initialize the chatbot
console.log("Chat with Ollama! Type 'exit' to end the conversation.");
startChat();
