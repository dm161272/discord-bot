
// Import builtin NodeJS modules to instantiate the service
const https = require('https');

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




/** const express = require('express');
//const { port } = require('./config.json');

const app = express();

https.createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
    ).listen(4000, () => {
    console.log("serever is runing at port 4000");
    });

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.get('/api/auth/discord/redirect', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});


//app.listen(port, () => console.log(`App listening at https://localhost:${port}`));
*/