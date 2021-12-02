const  { MessageActionRow, MessageSelectMenu } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: "wyr",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/fun/wyr.js",
    aliases: ['would-you-rather'],
    category: "fun",
    use: "wyr",
    cooldown: 2,
    description: "searches google using the query provided",
    async execute(client, message, args, Discord, economy, util){

        const msg = await message.channel.send("Loading! :gear:")
        if(axios.get('https://api.tovade.xyz/v1/fun/wyr')) return msg.edit("Api is currently down!")
        const body = axios.get('https://api.tovade.xyz/v1/fun/wyr')
        const res = body.data
        let option = {
            label:'Would You Rather!',
            value:'dwyr1',
            description:`${res.questions["0"]}`,
        }

        let option2 = {
            label:'Would You Rather!',
            value:'dwyr2',
            description:`${res.questions["1"]}`,
        }

        let row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId('rughugregjtrw')
            .setPlaceholder('Click me! :D')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions([option, option2])
        )
            
        msg.delete()
        await message.channel.send({content: "**Would you rather!**", components: [row]}).then(async (m) => {
            const filter =  (mes) => mes.member.id === message.author.id;
            const collector = m.createMessageComponentCollector({filter: filter, time: 60000})

            collector.on('collect', (b) => {
                if (b.values[0] == 'dwyr1')  {
                    b.reply(`The percentage of people who chose ${b.description} was \`${res.percentage["1"]}%\`!`);
                    collector.stop()
                } else if (b.values[0] == 'dwyr2')  {
                    b.reply(`The percentage of people who chose ${b.description} was \`${res.percentage["2"]}%\`!`);
                    collector.stop()
                } 
            })
        })
    }
}