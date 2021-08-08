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
    category: "basic",
    use: "!m image",
    description: "gets image of google images using the query provided",
    async execute(client, message, args, Discord, economy, util) {
        const userutil = await client.functions.get("getUtil").execute(message);

        const image_query = args.slice(1).join(" ")
        if (!image_query) 
            return message
                .channel
                .send('Please include a search query!')

        const image_results = await google.scrape(image_query, 10);

        const chosen_image = Math.floor(Math.random() * image_results.length)

        const imageEmbed = new Discord
            .MessageEmbed()
            .setColor(userutil.colour)
            .setTitle(`Google image search`, `${image_results[chosen_image].url}`)
            .setImage(`${image_results[chosen_image].url}`)
            .setTimestamp()
        message
            .channel
            .send({embeds: [imageEmbed]})
    }
}