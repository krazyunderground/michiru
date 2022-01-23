const Canvas = require('canvas')
const fetch = require('node-fetch')
const { Image } = require('canvas')
const {Captcha} = require("captcha-canvas")

module.exports = async (Discord, client, member) => {
    const welcomeChannelProfile = await client.functions.get("guildCheck").execute(member)
    if(welcomeChannelProfile.welcomeChannel){
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
            const channel = client.channels.cache.get(welcomeChannelProfile.welcomeChannel)

            var background = new Image();
            await new Promise(r => background.onload=r, background.src=banner)
            
            const canvas = Canvas.createCanvas(1024, 410)
            
            const ctx = canvas.getContext('2d')

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

            const i = ctx.getImageData(0, 0, 1, 1).data
            const rgb = i[0] + i[1] + i[2]
            
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

            message = await channel.send({content: `Welcome to the server, ${member}`, files: [{attachment: canvas.toBuffer(), name: `welcome-image.png`}]})
            console.log(avatar.width, avatar.height)
        }, 1000)
        
    }
    //Create userEcon in DB
    if(member.bot) return
    const userEcon = require("../../models/userEcon");
    try {
        const econ = await userEcon.findOne({
          userID: member.id,
        });
  
        if (!econ) {
          let profile = await userEcon.create({
            userID: member.id,
            quartz: 0,
            pick: 1,
          });
  
          profile.save();
          console.log(`${member.id} New econ profile created!`);
        } else {
          console.log(`${member.id} already has a econ profile!`);
        }
      } catch (err) {
        console.log(err);
      }
      //create userUtil in DB
      const userUtil = require("../../models/userUtil");
      try {
        const util = await userUtil.findOne({
          userID: member.id,
        });
  
        if (!util) {
          let profile = await userUtil.create({
            userID: member.id,
            color: "#FF9CA9"
          });
  
          profile.save();
          console.log(`${member.id} New util profile created!`);
        } else {
          console.log(`${member.id} already has a util profile!`);
        }
      } catch (err) {
        console.log(err);
      }
      
      const gp = await client.functions.get("guildCheck").execute(member)
        if(!gp.captchaRole) return 

        const captcha = new Captcha()
        captcha.async = true
        captcha.addDecoy()
        captcha.drawTrace()
        captcha.drawCaptcha()
        
        const captchaAttachment = new Discord.MessageAttachment(await captcha.png, "captcha.png")

        const responsemsg = await member.send({files: [captchaAttachment], content: `Solve the captcha to be verified in ${member.guild.name}!`})

        const filter = (m) => m.author.id === member.id
        try{
            const collector = responsemsg.channel.createMessageCollector({filter, time: 30000})
            collector.on("collect", response => {
                if(response.content === captcha.text) {
                    member.roles.add(gp.captchaRole)
                    member.send(`You've been verified in ${member.guild.name}! 🎉`)
                    return
                } else {
                    if(!member.roles.cache.has(gp.captchaRole)){
                      member.send(`You failed to verify, so you have been kicked. Simply rejoin to try again!`)
                      if(member.kickable) member.kick()
                      return
                    }
                }
            }) 
            collector.on("end", response => {
                if(!member.roles.cache.has(gp.captchaRole) && response.size === 0){
                    member.send(`You failed to verify, so you have been kicked. Simply rejoin to try again!`)
                    if(member.kickable) member.kick()
                    return
                }
            })
        } catch(err) {
            member.send(`An error may have occoured, so you have been kicked. Simply rejoin to try again!`)
            if(member.kickable) member.kick()
            return
        }
}
