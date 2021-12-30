module.exports = {
    name: "links",
    description: "make the links message",
    category: "dev",
    use: "links",
    cooldown: 0,
    maxArgs: 1,
    async execute(client, message, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle('──────────────┤ Useful Links  ├──────────────')
        .setColor('#FF9CA9')
        .setDescription('Click the links below to check out more content from us and our partners!')
        .addFields(
            {name: 'Michiru Links', value: '<:bot:916398521278677022> [Invite Me](https://bit.ly/michiru-botv2)\n<:michiru:917507129559105606> [Website](http://michiru.mooo.com/)\n<:github:926169155449794611> [Github](https://github.com/krazyunderground/michiru)\n<:server:916398528983601162> [Discord](https://discord.gg/t9yebSe7jg)\n\u200B'},
            {name: 'Partners', value: '**Shard**\nWan\'t your own Discord bot but don\'t know how to code? You can commission one below!\n<:server:916398528983601162> [Discord](https://discord.gg/xxmFV4Ct3k)'}
            )
        .setFooter("⚙️", client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send({embeds: [embed]})
    }
}