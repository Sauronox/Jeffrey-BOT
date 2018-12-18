const { Command } = require('discord.js-commando');
const {} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stop la music en cours',
            examples: ['cdev stop'],
        });
    }
    run(msg,{song}) {
        let channel = msg.channel;
        let author = msg.author;
        let voiceChannel  = msg.guild.voiceConnection
        if (voiceChannel == 'null') return msg.reply('I couldn\'t connect to your voice channel...');
        voiceChannel.dispatcher.end()
        return;
    }
};