const Canvas = require('canvas')

module.exports = async (Discord, client, member) => {
    if(member.guild.id === "848707853350862858"){
        const channel = await member.guild.channels.cache.find(ch => ch.id === "853961163104976917") 

        const background = await Canvas.loadImage('./assets/welcome-image.jpg')
        
        const canvas = Canvas.createCanvas(background.width, background.height)
        
        const ctx = canvas.getContext('2d')

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 5
        ctx.strokeRect(0, 0, canvas.width, canvas.height)

        ctx.textAlign = 'center'

        ctx.font = '36px sans-serif'
        ctx.fillStyle = '000000'
        ctx.fillText(`Welcome to the server!`, canvas.width / 2, canvas.height / 8 - 25, 600)

        ctx.font = '48px sans-serif'
        ctx.fillText(
            `${member.displayName}!`,
            canvas.width / 2,
            canvas.height / 8 + 48 - 25,
            600
        )

        left = (canvas.width - 400) / 2
        top = (canvas.height - 400) / 2 + 25

        ctx.beginPath()
        ctx.arc(left + 200, top + 200, 200, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()

        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({format: 'png'})
        )


        ctx.drawImage(avatar, left, top, 400, 400)

        const attachment = new Discord.MessageAttachment(
            canvas.toBuffer(),
            'weclome-image.png'
        )

        message = channel.send(`Welcome to the server, ${member}`, attachment)
    }
}