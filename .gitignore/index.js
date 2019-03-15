const Discord = require("discord.js");


const client = new Discord.Client();
var prefix = ".";

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande :x:")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer ! :x:")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide ! :x: ")
        if (count < 1 || count > 1000) return message.channel.send("Veuillez indiquer un nombre entre 1 et 1000 ! :x:")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande :x:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})

client.on('message', message =>{
    if(message.content === ".help"){
        message.reply('Liste des commandes : .ban, bannir un membre (permissions requises) .ping, Pong !  .help, afficher ce menu .invite, inviter WysBot dans votre serveur. .kick, kicker quelqun du serveur (permissions requises)');
    }
});
client.on('message', message =>{
    if(message.content === ".ping"){
  message.reply('Pong!');  
        
}
});
client.on('message', message =>{
    if(message.content === ".invite"){
        message.reply('Voici le lien d invitation: https://discordapp.com/oauth2/authorize?client_id=554645826148761605&scope=bot&permissions=8');
}
});

client.on("ready", () => {

console.log('Bot activated !')

  client.user.setActivity(`Sur ${client.guilds.size} servers !  .help`);
});

client.on("guildCreate", guild => {

  console.log('Nouvelle guild : ${guild.name} (id: ${guild.id}).Cette guilde a ${guild.memberCount} membres!');
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
