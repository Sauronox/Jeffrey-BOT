const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dev',
            group: 'basic',
            memberName: 'dev',
            description: 'Tout les info sur les commande du bot.',
            examples: ['eval'],

            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, {text}) {
        let channel = msg.channel;
        let author = msg.author;

        return msg.say(eval(text));
    }
};