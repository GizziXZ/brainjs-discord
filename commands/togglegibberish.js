let gibberishMode = false;
let gibberish;

function generateRandomInput() {
    const characters = 'abcdefghijklmnopqrstuvwxyz ';
    let input = '';
    for (let i = 0; i < 10; i++) {
        input += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return input;
}

module.exports = {
    name: 'togglegibberish',
    description: 'Toggle gibberish mode',
    execute(client, message, args, net) {
        gibberishMode = !gibberishMode;
        message.reply('Gibberish mode is now ' + (gibberishMode ? 'on' : 'off') + '.');

        if (gibberishMode) {
            const channel = message.channel;
            if (channel) {
                gibberish = setInterval(() => {
                    if (!net) return;
                    if (!gibberishMode) clearInterval(gibberish)

                    const input = generateRandomInput();
                    const output = net.run(input);

                    if (output.trim().length === 0) return;

                    console.log(client.user.tag + ':' + output);
                    channel.send(output);
                }, 3000);
            }
        }
    }
}