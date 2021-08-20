const Discord = require("discord.js")
const fetch = require("node-fetch")
const Canvas = require("canvas")
const { Image } = require("canvas")

module.exports = {
    name: "whatanime",
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
        
        // let img = new Image();
        // await new Promise(r => img.onload=r, img.src=url)
        
        // const canvas = Canvas.createCanvas()
        // canvas.width = img.naturalWidth;
        // canvas.height = img.naturalHeight;
        // var ctx = canvas.getContext("2d");
        // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // fetch("https://trace.moe/api/search", {
        // method: "POST",
        // body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
        // headers: { "Content-Type": "application/json" },
        // })
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