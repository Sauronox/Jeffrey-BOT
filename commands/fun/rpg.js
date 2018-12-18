const { Command } = require('discord.js-commando');
const { RichEmbed, Guild, Emoji  } = require('discord.js');

module.exports = class RpgCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rpg',
            group: 'fun',
            memberName: 'rpg',
            description: 'Displays a list of available commands, or detailed information for a specified command.',
            examples: ['fun'],

        });
    }

    run(msg) { // eslint-disable-line complexity
         let channel = msg.channel;
         let author = msg.author;

        const embed = new RichEmbed()
            .setTitle('Command List BOT')
        // Set the color of the embed
            .setColor('RANDOM')
            // Set the main content of the embed
            .setDescription('Utiliser cdev ou @ suivi du nom du bot')
            .addBlankField(false)
            .addField(":crossed_swords:", "Vous permet de lancer un combat",false)
            .addField(":school_satchel:", "Vous permet de voir votre sac",false)
            .addField(":bust_in_silhouette:", "Vous permet de voir votre profil",false)
            .setTimestamp(new Date())
            .setFooter("Sauronox",author.avatarURL);

        msg.embed(embed).then(function (message) {
            message.react("⚔")
            message.react("🎒")
            message.react("👤")
        })
        //msg.react("⚔")
    }
};
