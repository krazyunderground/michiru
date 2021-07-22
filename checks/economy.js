module.exports = {
    name:"economy",
    execute(Discord, client, message, economy, util){
        if(!economy.has(`${message.author.id}.quartz`)){
            economy.set(`${message.author.id}.quartz`, 200)
        }

        if(!economy.has(`${message.author.id}.pick`)){
            economy.set(`${message.author.id}.pick`, [1, "https://cdn.discordapp.com/attachments/853961222520045598/856605265277091840/basic_pick.png"])
        }
    }
}