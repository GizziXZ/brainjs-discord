const { createCanvas, loadImage } = require('canvas');
const Discord = require('discord.js')
const path = require('path')

module.exports = {
    name: 'aristotle',
    description: 'AI generated Aristotle quotes',
    async execute(client, message, args, net) {
        const input = args.join(' ');
        let output = net.run(input);

        if (output.trim().length === 0) {
            message.reply('I don\'t know what to say.');
            return;
        }

        // while (output.trim().length === 0) {
        //     output = net.run(input);
        // }

        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');
        const imagePath = path.join(__dirname, '..', 'images', 'aristotle.png');

        // Load the image using a Promise
        const image = await new Promise((resolve, reject) => {
            loadImage(imagePath).then(resolve).catch(reject);
        });

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(output, canvas.width / 1.5, canvas.height / 2);

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'aristotle.png');
        message.reply({ files: [attachment] });
    }
}