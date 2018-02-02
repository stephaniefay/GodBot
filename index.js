/*
  A bot that welcomes new guild members when they join
  */

// Import the discord.js module
const Discord = require('discord.js');
const config = require('./config.json');

// Create an instance of a Discord client
const client = new Discord.Client();

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
	console.log(`Bot (${client.user.tag}) has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	client.user.setActivity(`GCT: Grand Chase`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;


  var m = message.content;
  m = m.toLowerCase();

  if(m.includes("hórus") || m.includes("horus")) {
  	console.log(message.author.username + ": " + m);
  	message.delete().catch(O_o=>{});
  	message.channel.send("Essa mensagem foi excluída pelos poderes de Ernasis/Lisnar/Armenian/Deus Doce/Sieghart/Teffy (você escolhe), porque Hórus é um putão.");

 	var channel = client.channels.get('222935000398430208');
  	await channel.send(`SHAME: ${message.author.tag}, afinal fica citando Hórus-o-putão`);

  	return;
  }

  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}

if(command === "digaalgo" || command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
}

if (command === 'avatar') {
	let member = message.mentions.members.first();
	message.delete().catch(O_o=>{});
   	if(!member) message.channel.send(message.author.avatarURL);
   	else message.channel.send(member.user.avatarURL);
  }

if (command === 'watching') {
	let member = message.mentions.members.first();
	message.delete().catch(O_o=>{});
	if(!member) {
		message.channel.send('Lembre-se que estou sempre observando vocês ಠﭛಠ', {
	            files: [
	                "./assets/watching.jpg"
	            ]
	        });
	    }
	else {
		message.channel.send(`Parece que querem que eu fique de olho em você ${member.user.username}`);
		message.channel.send(`Mas vou ficar mesmo é de olho no(a) ${message.author.username}, porque você não manda em mim ಠﭛಠ`, {
	            files: [
	                "./assets/watching.jpg"
	            ]
	    	});
	    }
	}
});


// Log our bot in
client.login(config.token);