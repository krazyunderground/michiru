module.exports = {
    name:"util",
    execute(Discord, client, message, economy, util){
        if(!util.has(`${message.guild.id}.prefix`)){
            util.set(`${message.guild.id}.prefix`, "!m ")
        }

        if(!util.has(`${message.guild.id}.${message.author.id}.colour`)){
            util.set(`${message.guild.id}.${message.author.id}.colour`, `FF9CA9`)
        }
    }
}