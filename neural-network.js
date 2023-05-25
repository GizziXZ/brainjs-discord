const fs = require('fs');
const brain = require('brain.js');
const chalk = require('chalk');
const { getTrainingData } = require('./database.js');

let net;
loadModel();

async function loadModel() {

     // Load the model from the file system if it exists
    if (fs.existsSync('model.json')) {
        const modelData = fs.readFileSync('model.json', 'utf8');
        net = new brain.recurrent.LSTM({ gpu: true });
        net.fromJSON(JSON.parse(modelData));
        console.log(chalk.yellow('Model loaded successfully'));
    } else {
        // Train a new model if it doesn't exist
        net = new brain.recurrent.LSTM({ gpu: true }); // Honestly I'm pretty sure gpu: true does nothing but whatever
        console.log(chalk.green(new Intl.DateTimeFormat('default', {  hour12: true, hour: 'numeric', minute: 'numeric' }).format(new Date())) + ' | Training model...');
        net.train(await getTrainingData(), {
            iterations: 300, // NOTE - no clue what the ideal number of iterations is, you might wanna change this
            log: (stats) => console.log(chalk.green(new Intl.DateTimeFormat('default', {  hour12: true, hour: 'numeric', minute: 'numeric' }).format(new Date())) + ' | ' + stats), // Log the progress of training
            errorThresh: 0.05,
        });
        fs.writeFileSync('model.json', JSON.stringify(net.toJSON()));
        console.log(chalk.yellow('Model trained and saved successfully'));
    }
}

// Train the model with the specified data and options
function trainModel(data, options) {
    net.train(data, options);
}

// Save the model to the file system
function saveModel() {
    fs.writeFileSync('model.json', JSON.stringify(net.toJSON()));
    console.log(chalk.yellow('Model saved successfully'));
}

module.exports = {
    loadModel,
    trainModel,
    saveModel,
    net
};