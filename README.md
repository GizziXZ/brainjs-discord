# Discord Chatbot

This is a chatbot for Discord that uses a neural network to generate messages based on previous messages used to train it. The neural network is trained using the `brain.js` library.

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Put a bot token in `config.json` and your account's one aswell if you're planning on using `surveillance.js` to save messages through your discord account
4. Run the bot with `node index.js`

## Info

This is my first time making a machine learning bot, I added in a little bit of markov chains to test out stuff and I'm not planning to really do any serious updates to this repo since I figured out it's better off to use markov chains mainly, and also whenever I train the model it comes out mentally deficient. so if you need a shitty reference to make a bot like this here you go, and if you want to make a pull request, go ahead.

I'm going to be working on making a bot that will only use markov chains instead.

## Usage

You need to get messages to train the bot to, or have an already made model, if you have an already made model, make sure the file is named `model.json`.
You can get messages to train the bot to by adding your own account's token to `config.json` and then running `node surveillance.js` that will save all messages going through your account to the quick.db database. (If you are not planning to use surveillance.js then no need to add your token to config.json)
and after a bit you can run `node index.js` to start training the model and then once training is done, the bot will come online.
You don't need to get messages from `surveillance.js` either, you could just have messages from somewhere and place them into the quick.db database.

There is a bit of markov chains involved in this. It does not work based off whether the model is trained or not, it's based off the messages in the database.

I didn't make a help command cause I can't be asked lol so here's a guide on how each command works:

`!aristotle [text]` : generates an aristotle quote using the model (text is optional, i think, i don't remember, i'm not good at this lol)

`!markovsentence` : generates a sentence using markov chains

`!run [text]` : basically talk to the model

`!togglegibberish` : make the model start spamming gibberish in chat

`!togglemarkovgibberish` : start spamming markov chains sentences in chat (it'll probably make sentences that make more sense than !togglegibberish)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
