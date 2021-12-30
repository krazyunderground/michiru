module.exports = {
    name: 'uiback',
    async execute (interaction, client, Discord) {
        interaction.deferUpdate()
        const userutil = await client.functions.get("getUserUtil").execute(interaction.member)

        const footer = interaction.message.embeds[0].footer.text
        const id = footer.slice(7)
        const user = interaction.guild.members.cache.get(id)
        const userdata = client.users.cache.get(id)
        
        const joinDiscord = userdata.createdAt
        const joinServer = user.joinedAt

        const roles = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
            .setCustomId('roles')
            .setLabel('View Roles')
            .setStyle('PRIMARY')
            .setEmoji('📜'))
        const embed = new Discord.MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setTitle(`${user.user.username}'s Info!`)
            .setDescription(`${user}`)
            .setColor(userutil.colour)
            .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))
            .addField('Joined at:', `${joinServer}`, false)
            .addField('Created at:', `${joinDiscord}`, false)
            .setFooter(`🌐 Id: ${user.id}`, client.user.displayAvatarURL())
            .setTimestamp();

        interaction.message.edit({embeds: [embed], components: [roles]})    
    }
}