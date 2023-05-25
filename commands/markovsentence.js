const Markov = require('markov-strings').default;
const { getMessages } = require('../database');
const chain = new Markov();

module.exports = {
    name: 'markovsentence',
    description: 'Generate a sentence using a Markov chain',
    async execute(client, message, args, net) {
        chain.addData((await getMessages()).messages);
        const sentence = chain.generate();

        message.reply(sentence.string);
}};