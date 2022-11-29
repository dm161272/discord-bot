require('dotenv').config();

const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on("messageCreate", message => {
    if (/hi/i.test(message.content)) {
        message.reply("Hello World!!!")}
});

client.login(TOKEN)