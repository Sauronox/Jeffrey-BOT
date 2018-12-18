const { Command } = require('discord.js-commando');
const {} = require('discord.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Deconnecte le bot du cannal vocal',
            examples: ['cdev leave'],

        });
    }
    run(msg) {
        let channel = msg.channel;
        let author = msg.author;
        let voiceChannel  = msg.member.voiceChannel
        // console.log(author)
        // console.log(channel)
        if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
        voiceChannel.leave()
        return;
    }
};