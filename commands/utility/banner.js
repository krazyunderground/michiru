const fetch = require('node-fetch')

module.exports = {
    name: "banner",
    category: "basic",
    use: "!m banner",
    cooldown: 0,
    description: "if the user has a banner, it will display it here",
    async execute(client, message, args, Discord, economy, util){

        let uid = message.member.id
        if(message.mentions.users.first()){
            uid = message.mentions.users.first().id
        }
        let receive = ''
        let banner = 'no banner found!'

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
            message.channel.send(banner)
        }, 1000)
    }
}