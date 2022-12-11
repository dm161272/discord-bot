
// Import builtin NodeJS modules 

const fs = require('node:fs');
const path = require('node:path');

const { discord_token }  = require('./config.json');

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

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

// add commands to client
client.commands = new Collection(); 

// get list of supported commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 

// load commands into client collection
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// executed once on bot login
client.once('ready', ()=> {
    console.log('QR Bot has been logged in');
});


// commands dynamic handler
client.on(Events.InteractionCreate, async interaction => {

    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
  
    if(!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    try {
        await command.execute(interaction);
 
    } catch (error) {
        console.error(error);
        await interaction.reply(
            {
                content: error.message, 
                ephemeral: true
            });
    }
});

client.login(discord_token);
