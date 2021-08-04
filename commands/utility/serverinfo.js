module.exports = {
    name: 'serverinfo',
    aliases: ["si"],
    description: 'this show the server info!',
    cooldown: 0,
    category: "basic",
    use: "!m serverinfo",
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)
        
        const guild = message.guild;
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setColor(userutil.colour)
        .addField('Genaral Info', `
            ID: ${guild.id},
            Name: ${guild.name},
            Owner: ${guild.owner},
        `)
        .addField('Counts', `
            Role: ${guild.roles.cache.size} roles,
            Channels: ${(guild.channels.cache.filter(c => c.type === 'voice').size) + (guild.channels.cache.filter(c => c.type === 'text').size)} total: ${(guild.channels.cache.filter(c => c.type === 'voice').size)} voice channel(s), ${(guild.channels.cache.filter(c => c.type === 'text').size)} text channel(s)
            Emojis: ${guild.emojis.cache.size} (Regular: ${guild.emojis.cache.filter((e) => !e.animated).size
            }, Animated: ${
                guild.emojis.cache.filter((e) => e.animated).size
            }) 
            Members: ${guild.members.cache.size}
        `)
        .addField("Additional Information", `
            Created: ${guild.createdAt}
            Region: ${guild.region}
            Verified: ${guild.verified}
            Boost Tier: ${guild.premiumTier || "None" }
            Boost Count: ${guild.premiumSubscriptionCount}
        `);

        message.channel.send({embeds: [embed]})
    },
};