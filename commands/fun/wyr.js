const  { MessageMenuOption, MessageMenu } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: "wyr",
    aliases: ['would-you-rather'],
    category: "basic",
    use: "!m wyr",
    cooldown: 2,
    description: "searches google using the query provided",
    async execute(client, message, args, Discord, economy, util){

        return message.reply("Currently being upgraded to v13!, Sorry for the inconvinience!")

        const msg = await message.channel.send("Loading! :gear:")
        const body = await axios.get('https://api.tovade.xyz/v1/fun/wyr')
        const res = body.data
        let option = new MessageMenuOption()
            .setLabel('Would You Rather!')
            .setValue('dwyr1')
            .setDescription(`${res.questions["0"]}`)

        let option2 = new MessageMenuOption()
            .setLabel('Would You Rather!')
            .setValue('dwyr2')
            .setDescription(`${res.questions["1"]}`)

        let select = new MessageMenu()
            .setID('rughugregjtrw')
            .setPlaceholder('Click me! :D')
            .setMaxValues(1)
            .setMinValues(1)
            .addOption(option)
            .addOption(option2)

        msg.delete()
        await message.channel.send("**Would you rather**", select).then(async (m) => {
            const filter =  (mes) => mes.clicker.user.id === message.author.id;
            const collector = m.createMenuCollector(filter)

            collector.on('collect', (b) => {
                b.reply.defer()
                if (b.values[0] == 'dwyr1')  {
                    m.edit(`The percentage of people who choose the same option you picked was \`${res.percentage["1"]}%\``);
                    collector.stop()
                } else if (b.values[0] == 'dwyr2')  {
                    m.edit(`The percentage of people who choose the same option you picked was \`${res.percentage["2"]}%\``);
                    collector.stop()
                } 
            })
        })
    }
}