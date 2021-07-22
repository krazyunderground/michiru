module.exports = async (Discord, client, reaction, user) => {
    if(reaction.message.partial) reaction.message.fetch()
    if(reaction.partial) reaction.fetch()
    if(reaction.message.channel.id === "858500180588625940"){
        if(reaction.emoji.id === "858692081869914112"){
            reaction.message.guild.members.cache.get(user.id).roles.add("853961098691739658")
        }
    }
}