const { Client } = require('discord.js-selfbot-v13');
const { saveMessages } = require('./database')
const { SELFTOKEN } = require('./config.json');
const chalk = require('chalk');
const client = new Client({
    checkUpdate: false,
}); // NOTE - This is a selfbot to save messages to the database, probably against Discord TOS, don't know, don't care

client.on('ready', () => {
    console.log(chalk.green('Logged in as ' + client.user.tag));
});

const urlRegex = /(https?:\/\/[^\s]+)/g;
const mentionRegex = /<@\d+>/;

client.on('messageCreate', async message => {
    if (message.author.bot || message.attachments.size > 0) return;

    console.log(chalk.blue(message.author.tag) + ': ' + message.content);
    const contentWithoutLinksOrMentions = message.content.replace(urlRegex, '').replace(mentionRegex, '');

    if (contentWithoutLinksOrMentions.trim().length === 0) return;

    saveMessages(contentWithoutLinksOrMentions);
});

client.login(SELFTOKEN);