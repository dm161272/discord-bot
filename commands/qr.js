const googleAPI = require('./../externalAPIs/googleQR');
const { SlashCommandBuilder } = require('@discordjs/builders');

const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Generates QR code for the url provided')
        .addStringOption(option => option.setName('url').setDescription('url to be encoded'))
        .addStringOption(option => option.setName('height').setDescription('height of QR in pixels'))
        .addStringOption(option => option.setName('width').setDescription('width of QR in pixels'))
        .addStringOption(option => option.setName('color').setDescription('color of QR'))
        ,
    async execute(interaction){

        if(interaction.options.getString('url') == null) {
            throw {name: 'empty URL string error ', message: 'An URL must be provided'};
        }
        // ***IMPORTANT*** if newRegExp assigned with const it causes it to work ONLY EVERY OTHER TIME!!!
        if(!new RegExp(pattern).test(interaction.options.getString('url'))) {
            throw {name: 'malformed URL string error ', message: 'Please provide a valid URL formatted string begins with http:// or https://'};
        }

        const url = interaction.options.getString('url');
        const height = interaction.options.getString('height');
        const width = interaction.options.getString('width');
        const color = interaction.options.getString('color');

        await interaction.reply(googleAPI.generateQR(url, height, width, color));
    }
};