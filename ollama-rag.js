// Run with: node ollama-rag.js
// Code to augment a query with additional data and generate a response using Ollama
const fs = require('fs');
const { Ollama } = require('@langchain/community/llms/ollama');

// Initialize Ollama
const ollama = new Ollama({
  baseUrl: "http://localhost:11434", // Adjust this to your Ollama server's URL
  model: "llama2", // or any other model you might be using
});

// Function to search the data file for relevant information
function retrieveData(query) {
  return new Promise((resolve, reject) => {
    const dataPath = './data/info.txt';
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Split data into sentences and search for a relevant line
      const sentences = data.split('\n');
      const relevantData = sentences.find(sentence => sentence.toLowerCase().includes(query.toLowerCase().split(' ')[0]));

      if (relevantData) {
        resolve(relevantData);
      } else {
        resolve(null);
      }
    });
  });
}

// Function to augment the query and generate a response
async function generateResponse(query) {
  try {
    const retrievedData = await retrieveData(query);
    const augmentedQuery = retrievedData ? `${query} Considering the following fact: ${retrievedData}` : query;

    // Send the augmented query to Ollama and get a response
    const response = await ollama.invoke(augmentedQuery);
    return response;
  } catch (error) {
    console.error("Error during data retrieval or generation:", error);
    return "An error occurred while generating the response.";
  }
}

// Example usage
generateResponse("What is the estimated population of the Earth?")
  .then(response => console.log("Generated Response:", response))
  .catch(error => console.error(error));
