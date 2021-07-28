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
        var Attachment = (message.attachments).array()
        
        if(!Attachment[0]) return message.channel.send("Upload the image in the same message as the command!")
        
        var url = Attachment[0].url
        
        let img = new Image();
        await new Promise(r => img.onload=r, img.src=url)
        
        const canvas = Canvas.createCanvas()
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        fetch("https://trace.moe/api/search", {
        method: "POST",
        body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
        headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((result) => {
            const embed = new Discord.MessageEmbed()
                .setImage(`https://media.trace.moe/image/${result.docs[0].anilist_id}/${encodeURIComponent(result.docs[0].filename)}?t=${result.docs[0].at}&token=${result.docs[0].tokenthumb}&size=l`)
                .setTitle(`Anime Title: ${result.docs[0].title_english || result.docs[0].anime}`)
                .addFields(
                    {name: "Episode:", value: `\`${result.docs[0].episode}\``, inline: true},
                    {name: "Adult?:", value: `\`${result.docs[0].is_adult}\``, inline: true},
                    {name: "Similarity:", value: `\`${(result.docs[0].similarity * 100).toFixed(1)}%\``, inline: true},
                    {name: "At:", value: `\`${new Date(result.docs[0].at * 1000).toISOString().substr(11, 8)}\``, inline: true},
                    {name: "From:", value: `\`${new Date(result.docs[0].from * 1000).toISOString().substr(11, 8)}\``, inline: true},
                    {name: "To:", value: `\`${new Date(result.docs[0].to * 1000).toISOString().substr(11, 8)}\``, inline: true}
                )
            message.channel.send(result.docs[0].at, {embeds: [embed]})
        });
    }
}