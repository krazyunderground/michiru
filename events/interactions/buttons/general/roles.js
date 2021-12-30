module.exports = {
    name: 'roles',
    async execute (interaction, client, Discord) {
        interaction.deferUpdate()
        const userutil = await client.functions.get("getUserUtil").execute(interaction.member)

        const footer = interaction.message.embeds[0].footer.text
        const id = footer.slice(7)
        const user = interaction.guild.members.cache.get(id)

        const roles = user.roles.cache.map(r => `${r}`).join(" ").split(" ").slice(0,-1).join(" | ") || "No Data"
        
        const back = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
            .setCustomId('uiback')
            .setLabel('Go Back')
            .setStyle('PRIMARY')
            .setEmoji('⏪'))
            
        const embed = new Discord.MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setTitle(`${user.user.username}'s Roles!`)
            .setDescription(`${user}`)
            .setColor(userutil.colour)
            .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))
            .addField('Roles:', `${roles}`)
            .setFooter(`🌐 Id: ${user.id}`, client.user.displayAvatarURL())
            .setTimestamp();

        interaction.message.edit({embeds: [embed], components: [back]})
    }
}