
// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const cron = require('cron');
const client = new Discord.Client();

var up=false;
var chan='';
var guild='';
var emo=false;
var emoteID='';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

let scheduledMessage = new cron.CronJob('00 00 * * * *', () => {
      // This runs every hour, you can do anything you want
      // Sends Bong in loaded channel
	
        chan.send('Bong');
});

client.on('messageReactionAdd', react=> {
	if(up&&!emo){
		emoteID=react.emoji.id;
		emo=true;
		scheduledMessage.start();
	}
});
client.on('message', msg => {
  if(msg.content==='bb.setup'){
	chan=msg.channel;
	up=true;
	chan.send('Please react to this message with the emote you would like Bigathy Benathy to react with to finish setup');
}
if(up&&emo){
	if (msg.content === 'bong'||msg.content==='Bong'||msg.content==='BONG') {
    		msg.react(msg.guild.emojis.cache.get(emoteID));
  	}
}if(msg.content==='bb.reset'){
	chan='';
	up=false;
	emo=false;
	emoteID=' ';
	scheduledMessage.stop();
}
});