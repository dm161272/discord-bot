const googleAPI = require('./../externalAPIs/googleQR');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-name')
		.setDescription('Replies with QR encoded user name'),
		async execute(interaction) {
		const name = encodeURI(interaction.user.username);
		await interaction.reply(googleAPI.generateQR(name));
	},
};




