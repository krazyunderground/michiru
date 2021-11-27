const Discord = require("discord.js")
var os = require('os');
const osu = require('node-os-utils')
const cpu = osu.cpu
const count = cpu.count()


module.exports = {
    name: "ping",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/ping.js",
    description: "shows latencies of the bot",
    category: "basic",
    use: "!m ping",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
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
            .setDescription(`🏓 Latency is ${(message.createdTimestamp - Date.now()) * -1}ms \n⌛ API Latency is ${secondsToDhms(Math.round(client.ws.ping))}ms\n🆙 Uptime: ${Math.floor(process.uptime())}\n<:mongodb:913943033395945592> MongoDB: ${mongodate2 - mongodate1}ms`)
            .addFields(
                { name: '🧠 Memory', value: `Total Memory: ${totalram}MB\nUsed Memory: ${usedram}MB\nFree Memory: ${freeram}MB\nPercentage Of Free Memory: ${prctfreeram}%`, inline: false},
                { name: '🔥 CPU', value: `Cores: ${count}\nUsage: ${usage}%`}
            )
            .setFooter("Pong!", client.user.displayAvatarURL())
            .setTimestamp()
            .setColor(userutil.colour)
        
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