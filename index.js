const Discord = require('discord.js');
const chalk = require('chalk');
const { TOKEN } = require('./config.json');
const { getMessages, saveMessages } = require('./database');
const { trainModel, saveModel, net } = require('./neural-network');
const fs = require('fs');

const client = new Discord.Client({ 
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_ATTACHMENTS,
    ]
});

(async () => {
    let messages = await getMessages();

    client.on('ready', async () => {
        console.log('Logged in as ' + chalk.blue(client.user.tag));

        // SECTION - fine-tune the model (probably not working properly)

        // setInterval(async () => { //NOTE - getting commented out unless I can figure out how to make it work properly and improve instead of making it dumber
        //     const newMessages = await getMessages();
        //     if (Array.isArray(newMessages) && newMessages.length > messages.length) {
        //         const newData = newMessages.slice(messages.length).map(message => ({
        //             input: message.slice(0, -1),
        //             output: message.slice(1)
        //         }));
        //         const trainingOptions = {
        //             iterations: 1,
        //             errorThresh: 0.01,
        //             learningRate: 0.1
        //         }
        //         trainModel(newData, trainingOptions);
        //         saveModel();
        //         messages = newMessages;
        //     }
        // }, 15000); // Check for new messages every 15 seconds

        //!SECTION
    });

    // Create a new collection to store commands
    client.commands = new Discord.Collection();

    const prefix = '!';

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    client.on('messageCreate', message => {
        if (message.author.bot) return;
        // console.log(message.content);
        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName); // I didn't make a help command so fuck you lol, check the /commands directory

        if (command) {
            try {
                command.execute(client, message, args, net);
            } catch (error) {
                console.error(error);
                message.reply('There was an error executing that command.');
            }
        } else {
            saveMessages(message.content); // the hivemind must grow
        }
    });

    client.login(TOKEN);
})();