const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'basic',
            memberName: 'help',
            description: 'Tout les info sur les commande du bot.',
            examples: ['help']
        });
    }
    run(msg) {
        let channel = msg.channel;
        let author = msg.author;
        const embed = new RichEmbed()
            .setTitle('Command List BOT')
            // Set the color of the embed
            .setColor('RANDOM')
            // Set the main content of the embed
            .setDescription('Utiliser cdev ou @ suivi du nom du bot')
            .addBlankField(false);
        this.client.registry.commands.forEach(element=>{
             embed.addField(element.name+" <"+element.examples+">",element.description,false);
        })

            embed.addBlankField(false)
            embed.setTimestamp(new Date());
            embed.setFooter("© Sauronox",author.avatarURL)

        // console.log(channel)
        // console.log(author)
        // console.log(msg)
        return msg.embed(embed); 
    }
};