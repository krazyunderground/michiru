module.exports = {
    name: 'roles',
    async execute (interaction, client, Discord) {
        interaction.deferUpdate()
        const userutil = await client.functions.get("getUserUtil").execute(interaction.member)

        const footer = interaction.message.embeds[0].footer.text
        const id = footer.slice(7)
        const user = interaction.guild.members.cache.get(id)

        let objarr = []
        for (const rolemap of user.roles.cache.values()) {
            if (rolemap.id === interaction.guild.id) {}
            else {objarr.push(rolemap)}
        }
        objarr.sort((a,b)=> (a.rawPosition < b.rawPosition ? 1 : -1))
        let rolenames = []
        objarr.forEach(role => {
            rolenames.push(role.name)
        })
        let roles = []
        rolenames.forEach(rolename => {
            const role = interaction.guild.roles.cache.find(role => role.name == rolename)
            roles.push(role)
        })
        const rolelist = roles.join(" | ") || "No Data"
        
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
            .addField('Roles:', `${rolelist}`)
            .setFooter(`🌐 Id: ${user.id}`, client.user.displayAvatarURL())
            .setTimestamp();

        interaction.message.edit({embeds: [embed], components: [back]})
    }
}