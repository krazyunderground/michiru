const fetch = require('node-fetch')

module.exports = {
    name: "banner",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/banner.js",
    category: "general",
    use: "banner",
    cooldown: 0,
    description: "if the user has a banner, it will display it here",
    async execute(client, message, args, Discord){
        let resultMessage = await message.channel.send("Trying to find users banner")
        let uid = message.member.id
        if(message.mentions.users.first()){
            uid = message.mentions.users.first().id
        }
        let receive = ''
        let banner = 'I couldn\'t find this users banner'

        let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
            
        method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(a => {
            if(a.status !== 404) {
                a.json().then(data => {
                    receive = data['banner']

                    if(receive !== null) {

                        let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bot ${client.token}`
                            }
                        })
                        let statut = ''
                        response2.then(b => {
                            statut = b.status

                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                            if(statut === 415) {
                                banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                            }

                        })
                    }
                })
            }
        })
        
        setTimeout(() => {
            resultMessage.delete();
            message.reply(banner)
        }, 1000)
    }
}