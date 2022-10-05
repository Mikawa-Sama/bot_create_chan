require("dotenv").config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = function (Bot) {
	const extra = {};
	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);


	extra.commands = [
		new SlashCommandBuilder()
			.setName('salon')
			.setDescription('crée un salon')
			.addStringOption(option =>
				option.setName('nom')
					.setDescription('nom du salon')
					.setRequired(true))
			.addMentionableOption(option =>
				option.setName('membre')
					.setDescription('ajouter un membre supplémentaire')
					.setRequired(true)
			),
		new SlashCommandBuilder()
			.setName('voc')
			.setDescription('crée un salon vocal')
			.addStringOption(option =>
				option.setName('nom')
					.setDescription('nom du salon')
					.setRequired(true))
			.addIntegerOption(option =>
				option.setName('nb')
					.setDescription('nombre de participant')
					.setRequired(true)
			),
	].map(command => command.toJSON());

	rest.put(Routes.applicationGuildCommands(Bot.user.id, "969369202836271194"), { body: extra.commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);

	return extra;
};
