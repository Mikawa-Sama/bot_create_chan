const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('voc')
    .setDescription('crée un salon vocal')
    .addStringOption(option =>
        option.setName('nom')
              .setDescription('nom du salon')
              .setRequired(true))
    .addIntegerOption(option =>
        option.setName('nb')
              .setDescription('nombre de participant')
              .setRequired(true)),
    async execute(interaction) {
        return;
    }
}
