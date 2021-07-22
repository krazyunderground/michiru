const Discord = require("discord.js")
const canv = require("canvas")

const { Image } = require("canvas")
module.exports = {
    name: "meme",
    aliases: ['caption', 'makememe', 'mememaker'],
    cooldown: 5,
    description: "makes a meme out of the params sent",
    async execute(client, message, args, Discord, economy, util){
        
        var Attachment = (message.attachments).array()
        var Input = args.slice(1).join(" ")
        
        var meme = new Discord.MessageAttachment(
            await makeMeme(Attachment[0].url , Input, message),
            'Michiru-meme.png'
        ) 
        
        if(meme !== undefined){
            message.channel.send("Done! Here is your meme!", meme)
        }
        
    }
}
const makeMeme = async (url, input, message) => {
    if(!url){
        message.channel.send("Provide an image and text!\n**Upload the image as an attachment!**")
        return undefined
    } 
  
    const canvas = canv.createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
  
    const fontSetting = "bold 40px Impact";
    ctx.font = fontSetting;
  
    const text = ctx.measureText(input);
    const textWidth = text.width

    let image = new Image();
    await new Promise(r => image.onload=r, image.src=url)
  
    canvas.width = image.width;
    canvas.height = image.height;
  
    ctx.font = fontSetting
    
    const center = Math.floor((canvas.width - textWidth) / 2) | 5
    const bottom = canvas.height - 30
    
    ctx.drawImage(image, 0, 0)
    
    ctx.fillStyle = "white"
    ctx.fillText(input, center, bottom)
  
    ctx.fillStyle = "black"
    ctx.strokeText(input, center, bottom)
  
    return canvas.toBuffer()
};