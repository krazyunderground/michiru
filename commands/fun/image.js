var scraper = require('images-scraper')

const Discord = require('discord.js')

const google = new scraper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
    name: 'image',
    aliases: ['im'],
    async execute(client, message, args, Discord, economy, util) {
        const image_query = args.slice(1).join(" ")
        if (!image_query) 
            return message
                .channel
                .send('Please include a search query!')

        const image_results = await google.scrape(image_query, 10);

        const chosen_image = Math.floor(Math.random() * image_results.length)

        const imageEmbed = new Discord
            .MessageEmbed()
            .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
            .setTitle(`Google image search`, `${image_results[chosen_image].url}`)
            .setImage(`${image_results[chosen_image].url}`)
            .setTimestamp()
        message
            .channel
            .send(imageEmbed)
    }
}