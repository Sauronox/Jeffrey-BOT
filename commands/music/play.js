const { Command } = require('discord.js-commando');
const {} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Deconnecte le bot du cannal vocal',
            examples: ['cdev play'],
            args: [
				{
					key: 'song',
					label: 'Song',
					prompt: 'inssérer un lien pour jouer la piste audio',
					type: 'string'
				}
			]
        });
    }
    run(msg,{song}) {
        let channel = msg.channel;
        let author = msg.author;
        const streamOptions = { seek: 0, volume: 1 };
        let voiceChannel  = msg.guild.voiceConnection
        if (voiceChannel == 'null') return msg.reply('I couldn\'t connect to your voice channel...');
        let dispatcher = voiceChannel.playStream(ytdl(song, { audioonly: true }))
        return;
    }
};



