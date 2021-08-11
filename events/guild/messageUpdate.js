module.exports = async (Discord, client, oldMessage, newMessage) => {
    const gp = await client.functions.get("checkGuild").execute(oldMessage)
    if(!gp.logsChannel) return;

    const logsChannel = client.channels.cache.get(gp.logsChannel)

    const guild = oldMessage.guild
    const editChannel = oldMessage.channel
    const editID = newMessage.id

    try {
        guild.channels.cache.get(editChannel.id).messages.fetch(editID).then(edit => {
            const oldContent= oldMessage.content
            const newContent = newMessage.content
            let oldContExists = true;
            let newContExists = true;
            if (!oldContent) oldContExists = false;
            if (!newContent) newContExsits = false;
            //attachment in old message & content in both
            if (oldMessage.attachments.size > 0 && oldContExists == true && newContExists == true) {
            const editEmbed = new Discord.MessageEmbed()
                .setAuthor(newMessage.author.username + '#' + newMessage.author.discriminator, newMessage.author.displayAvatarURL({ dynamic: true }))
                .setTitle("Message Edited")
                .setColor("#F6AE8A")
                .setImage(oldMessage.attachments.first().proxyURL)
                .addFields({name: "**Channel**", value: `${editChannel}`}, 
                {name: "**Message ID**", value: `[${editID}](${edit.url})`}, 
                {name: "**Old Message**", value: `${oldContent}`}, 
                {name: "**New Message**", value: `${newContent}`})
            logsChannel.send( {embeds: [editEmbed] });
        }
        //attachment in old message with content only in old
        if (oldMessage.attachments.size > 0 && oldContExists == false && newContExists == true) {
            const editEmbed = new Discord.MessageEmbed()
                .setAuthor(newMessage.author.username + '#' + newMessage.author.discriminator, newMessage.author.displayAvatarURL({ dynamic: true }))
                .setTitle("Message Edited")
                .setColor("#F6AE8A")
                .setImage(oldMessage.attachments.first().proxyURL)
                .addFields({name: "**Channel**", value: `${editChannel}`}, 
                {name: "**Message ID**", value: `[${editID}](${edit.url})`}, 
                {name: "**New Message**", value: `${newContent}`})
            logsChannel.send( {embeds: [editEmbed] });
        }
        //no attachment
        else if (!oldMessage.attachments.size > 0) {
            const editEmbed = new Discord.MessageEmbed()
            .setAuthor(newMessage.author.username + '#' + newMessage.author.discriminator, newMessage.author.displayAvatarURL({ dynamic: true }))
            .setTitle("Message Edited")
            .setColor("#F6AE8A")
            .addFields({name: "**Channel**", value: `${editChannel}`}, 
            {name: "**Message ID**", value: `[${editID}](${edit.url})`}, 
            {name: "**Old Message**", value: `${oldContent}`},
            {name: "**New Message**", value: `${newContent}`})
        logsChannel.send( {embeds: [editEmbed] });
        }
    
    
    
    
    }).catch((err) => console.log(`${err} Error logging edited message!`))
        


    } catch (err) {
        console.log(`${err} Error finding message to log`)

    }
};