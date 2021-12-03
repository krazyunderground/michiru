const Discord = require("discord.js")
var os = require('os');
const osu = require('node-os-utils')
const cpu = osu.cpu
const count = cpu.count()


module.exports = {
    name: "ping",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/ping.js",
    description: "shows latencies of the bot",
    category: "dev",
    use: "ping",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
    if(!client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("854061604258054214")) return message.reply("This command is for devs only! *If you're having issues, please let us know in the support server. https://discord.com/invite/E9BnSJHWSK*")
        const mongodate1 = Date.now()
        const userutil = await client.functions.get("getUtil").execute(message)
        const mongodate2 = Date.now()
        const totalram = ((os.totalmem() / 10**6 + " ").split('.')[0]);
        const freeram = ((os.freemem() / 10**6 + " ").split('.')[0]);
        const usedram = (((os.totalmem() - os.freemem()) / 10**6 + " ").split('.')[0]);
        const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
        const usage = await cpu.usage()
        message.channel.send('Calculating current ping...').then((resultMessage) => {
        const pingEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.author.username}'s Ping Request!`)
            .setDescription(`🏓 Latency is ${(resultMessage.createdTimestamp - Date.now()) * -1}ms \n🖥️ API Latency is ${secondsToDhms(Math.round(client.ws.ping))}\n🆙 Uptime: ${Math.floor(process.uptime())}\n<:mongodb:913943033395945592> MongoDB: ${mongodate2 - mongodate1}ms`)
            .addFields(
                { name: '🧠 Memory', value: `Total Memory: ${totalram}MB\nUsed Memory: ${usedram}MB\nFree Memory: ${freeram}MB\nPercentage Of Free Memory: ${prctfreeram}%`, inline: false},
                { name: '🔥 CPU', value: `Cores: ${count}\nUsage: ${usage}%`}
            )
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("⚙️ Pong!", client.user.displayAvatarURL())
        
        resultMessage.delete();    
        message.channel.send({embeds: [pingEmbed]})
        })
    }
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}