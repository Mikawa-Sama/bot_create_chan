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




// const fs = require('node:fs');
// const path = require('node:path');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');

// const commands = []
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	commands.push(command.data.toJSON());
// }

// const rest = new REST({ version: '10' }).setToken(token);

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

// 	//OTY5Mzc1NjIyMTI2MjY4NDc2.G_ZLX7._Hpw6R2vsQdXBwMLwyXUNVDF8aXLIqOcJctN-E

