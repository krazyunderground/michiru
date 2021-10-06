const Discord = require("discord.js")
const fetch = require("node-fetch")
const Canvas = require("canvas")
const { Image } = require("canvas")

module.exports = {
    name: "whatanime",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/whatanime.js",
    aliases: ['anime', 'wa'],
    cooldown: 2,
    description: "uses trace.moe to find the anime of an image provided",
    category: "basic",
    use: "!m whatanime",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message);
        
        var Attachment = message.attachments.first()
        
        if(!Attachment) return message.channel.send("Upload the image in the same message as the command!")
        
        var url = Attachment.url
        
        await fetch(
            `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`
          )
        .then((res) => res.json())
        .then((result) => {
            const embed = new Discord.MessageEmbed()
                .setImage(result.result[0].image)
                .setTitle(`Anime Title: ${result.result[0].anilist.title.english || result.result[0].anilist.title.native}`)
                .addFields(
                    {name: "Episode:", value: `\`${result.result[0].episode}\``, inline: true},
                    {name: "Adult?:", value: `\`${result.result[0].anilist.isAdult}\``, inline: true},
                    {name: "Similarity:", value: `\`${(result.result[0].similarity * 100).toFixed(1)}%\``, inline: true},
                    {name: "From:", value: `\`${new Date(result.result[0].from * 1000).toISOString().substr(11, 8)}\``, inline: true},
                    {name: "To:", value: `\`${new Date(result.result[0].to * 1000).toISOString().substr(11, 8)}\``, inline: true},
                    {name: "Synonyms:", value: `\`${result.result[0].anilist.synonyms.join(", ")}\``, inline: true},
                )
            .setColor(userutil.colour)
            message.channel.send({embeds: [embed]})
        });
    }
}