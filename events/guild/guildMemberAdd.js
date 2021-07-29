const Canvas = require('canvas')
const fetch = require('node-fetch')
const { Image } = require('canvas')
const fs = require("fs")

module.exports = async (Discord, client, member) => {
    if(member.guild.id === "848707853350862858"){
        let uid = member.id
        let receive = ''
        var banner = 'https://cdn.discordapp.com/attachments/853961222520045598/869738739214188565/welcome-image.png'
        let statut = ''

        await fetch(`https://discord.com/api/v8/users/${uid}`, {
            
        method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
            }
        
        }).then(async a => {
            if(a.status !== 404) {
                a.json().then(async data => {
                    receive = data['banner']

                    if(receive !== null) {

                        let response2 = await fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bot ${client.token}`
                            }
                        }).then(async b => {
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

        setTimeout(async () => {

            const channel = await member.guild.channels.cache.find(ch => ch.id === "853961163104976917")

            var background = new Image();
            await new Promise(r => background.onload=r, background.src=banner)
            
            const canvas = Canvas.createCanvas(1024, 410)
            
            const ctx = canvas.getContext('2d')

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

            const i = ctx.getImageData(0, 0, 1, 1).data
            const rgb = i[0] + i[1] + i[2]
            console.log(rgb)
            
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 5
            ctx.strokeRect(0, 0, canvas.width, canvas.height)

            ctx.textAlign = 'center'

            ctx.font = '36px sans-serif'
            var filler
            if(rgb <= 382.5){filler = "#FFFFFF"}
            if(rgb >= 382.5){filler = "#000000"}
            ctx.fillStyle = filler
            
            ctx.fillText(`Welcome to the server!`, canvas.width / 2, canvas.height / 8 - 15, 600)

            ctx.font = '48px sans-serif'
            ctx.fillText(
                `${member.displayName}!`,
                canvas.width / 2,
                canvas.height / 8 + 48 - 15,
                600
            )

            left = (canvas.width - 300) / 2
            top = (canvas.height - 300) / 2 + 35

            ctx.beginPath()
            ctx.arc(left + 150, top + 150, 150, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.clip()

            const avatar = await Canvas.loadImage(
                member.user.displayAvatarURL({format: 'png'})
            )


            ctx.drawImage(avatar, left, top, 300, 300)

            path = `./assets/${member.id}-${member.guild.name}.png`

            // await fs.writeFileSync(
            //     path, canvas.toBuffer('image/png')
            // )

            message = await channel.send({content: `Welcome to the server, ${member}`, files: [{attachment: /*`./assets/${member.id}-${member.guild.name}.png`*/canvas.toBuffer(), name: `welcome-image.png`}]})
            //channel.send()
            console.log(avatar.width, avatar.height)
            // fs.unlinkSync(`./assets/${member.id}-${member.guild.name}.png`, (err) => {
            //     if (err) throw err;
            //     console.log('asset was deleted');
            // })
        }, 1000)
        
    }
}
