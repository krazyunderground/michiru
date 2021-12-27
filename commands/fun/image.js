var scraper = require('images-scraper')

const Discord = require('discord.js')
//create scraper
const google = new scraper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
    name: 'image',
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/image.js",
    aliases: ['isearch, gi'],
    category: "fun",
    use: "image",
    description: "searches google images using the query provided.",
    async execute(client, message, args, Discord, economy, util) {
        const userutil = await client.functions.get("getUtil").execute(message);

        //get image
        const image_query = args.slice(1).join(" ")
        if (!image_query) return message.channel.send('Please include a search query!')
        const image_results = await google.scrape(image_query, 10);
        const chosen_image = Math.floor(Math.random() * image_results.length)

        //create and send embed
        const imageEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`${message.author.username}'s Google Search`, `${image_results[chosen_image].url}`)
            .setImage(`${image_results[chosen_image].url}`)
            .setColor(userutil.colour)
            .setTimestamp()
            .setFooter("🎲", client.user.displayAvatarURL())

        message.channel.send({embeds: [imageEmbed]})
    }
}