const Markov = require('markov-strings').default;
const { getMessages } = require('../database');
const chain = new Markov();

let markovGibberishMode = false;
let gibberish;

module.exports = {
    name: 'togglemarkovgibberish',
    description: 'It\'s like togglegibberish, but with Markov chains, so the bot will form sentences that make a little more sense.',
    async execute(client, message, args, net) {
        chain.addData((await getMessages()).messages);
        markovGibberishMode = !markovGibberishMode;
        message.reply('Markov Gibberish mode is now ' + (gibberishMode ? 'on' : 'off') + '.');

        if (markovGibberishMode) {
            const channel = message.channel;
            if (channel) {
                gibberish = setInterval(() => {
                    if (!markovGibberishMode) clearInterval(gibberish)

                    const sentence = chain.generate();

                    if (sentence.string.trim().length === 0) return;

                    console.log(client.user.tag + ':' + output);
                    channel.send(sentence.string);
                }, 3000);
            }
        }
    }};