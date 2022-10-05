const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
  .setName('salon')
  .setDescription('crée un salon')
  .addStringOption(option => 
    option.setName('nom')
          .setDescription('nom du salon')
          .setRequired(true))
  .addMentionableOption(option => 
    option.setName('membre')
          .setDescription('ajouter un membre supplémentaire')
          .setRequired(true)),

 	async execute(interaction) {
       return;
    }
  }
