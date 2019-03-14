const Discord = require("discord.js");


const client = new Discord.Client();

var prefix = "!";
client.on('message', message =>{
    if(message.content === "!ping"){
        message.reply('Pong ! :heart:');
    }
});



client.on("ready", () => {

  console.log(`Le bot à démaré avec ${client.users.size} utilisateurs, dans ${client.channels.size} salons de ${client.guilds.size} guilds.`); 

  client.user.setActivity(`Sur ${client.guilds.size} servers ! !help`);
});

client.on("guildCreate", guild => {

  console.log(`Nouvelle guild : ${guild.name} (id: ${guild.id}).Cette guilde a ${guild.memberCount} membres!`);
  client.user.setActivity(`Sur ${client.guilds.size} servers ! `);
});

client.on("guildDelete", guild => {

  console.log(`J'ai été enlevé de : ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Sur ${client.guilds.size} servers !`);
});
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglasses:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
});
 
/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});

 
client.login(process.env.TOKEN);
