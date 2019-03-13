const Discord = require("discord.js");


const client = new Discord.Client();



client.on("ready", () => {

  console.log(`Le bot à démaré avec ${client.users.size} utilisateurs, dans ${client.channels.size} salons de ${client.guilds.size} guilds.`); 

  client.user.setActivity(`Sur ${client.guilds.size} servers !`);
});

client.on("guildCreate", guild => {

  console.log(`Nouvelle guild : ${guild.name} (id: ${guild.id}).Cette guilde a ${guild.memberCount} membres!`);
  client.user.setActivity(`Sur ${client.guilds.size} servers ! `);
});

client.on("guildDelete", guild => {

  console.log(`J'ai été enlevé de : ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Sur ${client.guilds.size} servers !`);
});



client.login("NTU0NjQ1ODI2MTQ4NzYxNjA1.D2lspA.f1GA1FcdqiRLebT39h1Rpj3SmBI");
