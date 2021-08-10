module.exports = async (Discord, client, message) => {
    const gp = await client.functions.get("checkGuild").execute(message)
    if(!gp.logsChannel) return;
    const logsChannel = client.channels.cache.get(gp.logsChannel)

    const deleteChannel = message.channel.id

    const fetchContent = message.content

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