const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = "MTA0NjQzMDU0NjEzNTM1NTQxMg.GK4cHl.Y9oFFQHp1rt-u4qf1hqmC8-8KHhAAum9_uQXfs";

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
    //console.log("DEBUG");
    if (/hi/i.test(message.content)) {
        message.reply("Hello World!!!")}
});

client.login(TOKEN)