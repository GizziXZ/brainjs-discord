module.exports = {
    name: 'run',
    description: 'Run the neural network',
    execute(client, message, args, net) {
        const input = args.join(' ');
        let output = net.run(input);

        if (output.trim().length === 0) {
            message.reply('I don\'t know what to say.');
            return;
        }

        // while (output.trim().length === 0) {
        //     output = net.run(input);
        // }

        console.log(client.user.tag + ':' + output);
        message.reply(output);
    }
}