const { Command } = require('discord.js-commando');
const {} = require('discord.js');
const fs = require('fs');
const opus = require('opusscript');
const WitSpeech = require('node-witai-speech');

function generateOutputFile(channel, member) {
    // use IDs instead of username cause some people have stupid emojis in their name
    const fileName = `./recordings/${channel.id}-${member.username}-${Date.now()}.pcm`;
    return fs.createWriteStream(fileName);
  }

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
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
            .then(connection => {
                console.log('Connected!');
                const receiver = connection.createReceiver();
                connection.on('speaking', (user, speaking) => {
                    // if (speaking) {
                    //     const audioStream = receiver.createPCMStream(user);
                    //     /* console.log(audioStream); */
                    //     try {
                    //         const outputStream = generateOutputFile(voiceChannel, user);

                    //         audioStream.pipe(outputStream);
                    //         outputStream.on("data", console.log);
                    //     } catch (error) {
                    //         console.console(error)
                    //     }
                    // }
                })
            })
            .catch(console.error);
        return ; 
    }
};