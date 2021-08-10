module.exports = async (Discord, client, message) => {
    if (message.embeds.size > 0) return;
    const gp = await client.functions.get("checkGuild").execute(message)
    if(!gp.logsChannel) return;
    const logsChannel = client.channels.cache.get(gp.logsChannel)

    const deleteChannel = message.channel.id

    const fetchContent = message.content
    let contExists = true;
    if(!fetchContent) {contExists = false}
    console.log(fetchContent)
    //attachment and content
    if (message.attachments.size > 0 && contExists == true) {
        const deleteEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Message Deleted")
        .setColor("#FF1C48")
        .setImage(message.attachments.first().proxyURL)
        .addFields(
            { name: "**Channel**", value: `<#${deleteChannel}>`},
            { name: "**Message**", value: `${fetchContent}`},
        )
        logsChannel.send({ embeds: [deleteEmbed] });
      }
      //attachment only
      else if (message.attachments.size > 0 && contExists == false){ 
        const deleteEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Message Deleted")
        .setColor("#FF1C48")
        .setImage(message.attachments.first().proxyURL)
        .addFields(
            { name: "**Channel**", value: `<#${deleteChannel}>`},
        )
        logsChannel.send({ embeds: [deleteEmbed] });
      }
      //content only
       else {
    const deleteEmbed = new Discord.MessageEmbed()
    .setAuthor(message.member.user.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTitle("Message Deleted")
    .setColor("#FF1C48")
    .addFields(
        { name: "**Channel**", value: `<#${deleteChannel}>`},
        { name: "**Message**", value: `${fetchContent}`}
    )
    logsChannel.send({ embeds: [deleteEmbed] });
      }
}
