  const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, BaseGuildVoiceChannel } = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);

}


client.once('ready', () => {
  console.log('Ready');
  require("./deploy-commands.js")(client);
});

var chanID = "";
var vocID = "";

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
    console.log(interaction);

    if (interaction.commandName === 'salon') {
        const name = interaction.options.getString('nom');
        const membre = interaction.options.getMentionable('membre');
        console.log(name);
        await interaction.guild.channels.create(name, {
          type: 'GUILD_TEXT',
        parent: '999410810998759556'})
          .then(result => {
            chanID = result.id});
      const user = interaction.user.id;
       console.log('moi:', interaction.user.id);
       console.log('membre:', membre.id);

       const row = new MessageActionRow()
			  .addComponents(
				new MessageButton()
					.setCustomId('fermer')
					.setLabel('fermer')
					.setStyle('DANGER'),
        );

      const embed = new MessageEmbed()
			    .setColor('#0099ff')
			    .setDescription('Salon privé ouvert entre <@' + user + '> et <@' + membre.id + '> ! \n' +
                          ' Appuyer sur le bouton pour fermer le salon quand vous aurez fini !');

        await client.channels.cache.get(chanID).send({ embeds: [embed], components: [row] }); 
    
        await client.channels.cache.get(chanID).permissionOverwrites.create(client.channels.cache.get(chanID).guild.roles.everyone, { VIEW_CHANNEL: false });
        await client.channels.cache.get(chanID).permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true});
        await client.channels.cache.get(chanID).permissionOverwrites.create(membre.id, { VIEW_CHANNEL: true});

        await interaction.reply({ content: '<@' + user + '> voici ton salon privé : <#' + chanID + '>', ephemeral: true }); 
    }
    else if (interaction.commandName === 'voc')
    {
      const name = interaction.options.getString('nom');
      const nb = interaction.options.getInteger('nb');

      await interaction.guild.channels.create(name, {
        type: 'GUILD_VOICE',
      })
      .then(result => {
        vocID = result.id
      }).then(() => {
      client.channels.cache.get(vocID).setUserLimit(nb)
      })

      console.log('chan id : ' + vocID)
        let voiceChannel = client.guilds.cache.get("969369202836271194").channels.cache.get(vocID);
        let membersInChannel = voiceChannel.members.size;
      if (membersInChannel == 0){
        console.log('femer voc')
      }
      console.log('end')
      
      const cache = membersInChannel

      if (membersInChannel != cache)
      {
        console.log("value change : " + membersInChannel)
        cache = membersInChannel;
      }
    }
});


client.on('interactionCreate', interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'fermer') {
      interaction.guild.channels.delete(interaction.channel.id);
      interaction.reply('Fermeture en cours...');
    }
  }
  console.log(interaction);
});


client.on('voiceStateUpdate', (oldState, newState) => {
  // console.log(newState);
  if (oldState.channel == null && newState.channel != null){
    console.log("join");
    console.log(newState.channel.members.size);
  }
  else if (oldState.channel != null && newState.channel == null) {
    console.log("leave");
    console.log(oldState.channel.members.size);
    if (oldState.channel.members.size == 0){
      setTimeout(() => {
        if (oldState.channel.members.size == 0){
          oldState.channel.delete(oldState.channelId)
        } 
      }, 120000);
    }
    else {
     clearTimeout(); 
    }
  }
});

client.login(process.env.TOKEN);

