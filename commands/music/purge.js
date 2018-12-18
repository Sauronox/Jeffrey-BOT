const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'music',
            memberName: 'purge',
            description: 'Surpimme tout les message d\'un nombre donné.',
            examples: ['purge <Nombre> message'],

            args: [
				{
					key: 'num',
					label: 'number',
					prompt: 'Combien de message voulait vous supprimer ? (>0)',
					type: 'integer'
				}
			]
        });
    }
    run(msg,{num}) {
        let channel = msg.channel;
        let author = msg.author;
        if(num <= 0){
            return msg.reply(" Vous devez choisir un chiffre supèrieur a 0");
        }else if(channel.type === "text"){
            return channel.fetchMessages({limit:num})
                .then(messages=>channel.bulkDelete(messages))
                .then(messages=> msg.reply(`La purge a supprimer ${messages.size} messages`))
                .catch(console.error);
        }
/*         console.log(channel)
        console.log(author) */
        console.log(channel)
        return msg.embed(embed); 
    }
};