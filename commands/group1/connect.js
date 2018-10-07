const { Command } = require('discord.js-commando');
const {} = require('discord.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'connect',
            group: 'group1',
            memberName: 'connect',
            description: 'Connecte le bot au channel voal ou vous êtes',
            examples: ['cdev connect'],

        });
    }
    run(msg) {
        let channel = msg.channel;
        let author = msg.author;
        let voiceChannel  = msg.member.voiceChannel
        // console.log(author)
        // console.log(channel)
        if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
        voiceChannel.join()  
            .then(connection => console.log('Connected!'))
            .catch(console.error);
        return ; 
    }
};