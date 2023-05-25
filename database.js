const { QuickDB } = require('quick.db');

const db = new QuickDB();

// Get all the messages from the database and return them along with the training data
async function getMessages() {
    let messages = await db.get('messages');
    if (!Array.isArray(messages)) {
        messages = [];
    }

    // Convert the messages into training data for the neural network
    let trainingData = messages.map(message => ({
        input: message.slice(0, -1),
        output: message.slice(1)
    }));

    return {messages, trainingData};
}

// Save the specified messages to the database
async function saveMessages(messages) {
    await db.push('messages', messages);
}

// Search the messages in the database for the specified query string
async function searchMessages(query) {
    let messages = await db.get('messages');
    if (!Array.isArray(messages)) {
        messages = [];
    }

    // Filter the messages array to only include messages that contain the query string
    let matchingMessages = messages.filter(message => message.includes(query));

    return matchingMessages;
}

module.exports = {
    getMessages,
    saveMessages,
    searchMessages,
    getTrainingData: async function() { // Get the training data from the messages in the database
        const { trainingData } = await getMessages();
        return trainingData;
    }
};