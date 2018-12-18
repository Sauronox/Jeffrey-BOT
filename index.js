require('dotenv').config()
const {} = require('discord.js');
const {RichEmbed, Client} = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const sqlite = require('sqlite');
const colors = require('colors/safe');
const client = new Commando.Client({
    owner: '184330578881937409',
    commandPrefix: 'cdev',
    disableEveryone: true
});
const {Game, ClientUser, Cient} = require('discord.js')

/* let points = JSON.parse(fs.readFileSync("./package.json", "utf8"));
console.log(points); */

fs.readFile('./log_chat.txt', function (err, data) {
	if (err) return fs.writeFile('log_chat.txt', '',function (err) {
		if (err) throw err;
		console.log('Saved!');
	  });
	console.log(data)
console.log(data);
});

client
	.on('emojiUpdate',(oldEmoji,newEmoji)=>{
		console.log(` ${oldEmoji} -> ${newEmoji} `)
	})
	.on('messageReactionAdd',(messageReaction,user)=>{
        console.log(user+"add reaction -> " ,messageReaction.message )
	})
    .on('messageReactionRemove',(messageReaction,user)=>{
        console.log(user+"remove reaction -> " ,messageReaction.message )
    })
    .on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);
		client.guilds.forEach(element=>{
			let i = 0;
			element.channels.forEach((channel)=>{
				if(i == 0){
					const embed = new RichEmbed()
					// Set the title of the field
					.setTitle(':loudspeaker: Bot disponible')
					// Set the color of the embed
					.setColor('RANDOM')
					// Set the main content of the embed
					.setDescription('Pour utiliser le bot utiliser      '+client.commandPrefix+" help");

					//channel.send(embed);
					console.log(channel.permissionOverwrites)
					console.log('ID:'+channel.id+' | type : '+channel.type+' | name : '+channel.name+' | parent : '+channel.parent+' | client : '+channel.client)
					console.log(JSON.stringify(channel))
				}
				i++
			});
		})
		client.user.setPresence({ game: { name: 'utilise cdev ou @'+client.user.username,url:"https://datadome.co/wp-content/uploads/2016/02/robot31-1-150x150.png",type:"LISTENING" }, afk:false,status: 'online' })
	})
    .on('message', msg => {
        let dateNow =  new Date();
		let formatLog = '['+dateNow.getHours()+':'+dateNow.getMinutes()+':'+dateNow.getSeconds()+'] '+msg.author.username+'<'+msg.author.id+'> : '+msg.content.toString();
		console.log(colors.blue('['+dateNow.getHours()+':'+dateNow.getMinutes()+':'+dateNow.getSeconds()+'] ')+msg.author.username+'<'+colors.red(+msg.author.id)+'> : '+msg.content.toString());
		fs.readFile('log_chat.txt', function (err, data) {
			if (err) {
			   return console.error(err);
			}
			fs.writeFile('log_chat.txt', data+'\n'+formatLog.toString(),function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

		 });
    })
    .on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
    .on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
    .on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    });

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);
    
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['music', 'Command for music or Speec with bot'],
        ['basic', 'Basic command'],
        ['fun', 'Futur RPG in bot'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({help: false})
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.key);