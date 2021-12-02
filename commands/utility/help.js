const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`)

module.exports = {
    name: "help",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/help.js",
    description: "shows help menus",
    category: "general",
    use: "test",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        const userutil = await client.functions.get("getUtil").execute(message)

        let guildData = await client.functions.get("guildCheck").execute(message)
        let prefix = guildData.prefix

            const general = new Discord.MessageEmbed().setColor(userutil.colour)
                .setTitle("General Commands")

            const eco = new Discord.MessageEmbed().setColor(userutil.colour)
                .setTitle(`Economy Commands`)
                
            const admin = new Discord.MessageEmbed().setColor(userutil.colour)
                .setTitle(`Administrator Commands`)
            
            const dev = new Discord.MessageEmbed().setColor(userutil.colour)
                .setTitle(`Developer Commands`)

            const cc = new Discord.MessageEmbed().setColor(userutil.colour)
                .setTitle(`Custom Commands`)
            const fun = new Discord.MessageEmbed().setColor(userutil.colour)
                .setTitle(`Fun Commands`)

        var generalcommand = new Array()
        var ecocommand = new Array()
        var funcommand = new Array()
        var devcommand = new Array()
        var admincommand = new Array()
        var cccommand = new Array()

        client.commands.forEach(command => {
            switch(command.category){
                case "general":
                    generalcommand.push(command)
                break
                case "eco":
                    ecocommand.push(command)
                break
                case "admin":
                    admincommand.push(command)
                break
                case "dev":
                    devcommand.push(command)
                break
                case "fun":
                    funcommand.push(command)
                    break
                case "cc":
                    cccommand.push(command)
                break
            }
        })

        generalcommand.forEach(command => {
            if(!command.use) return
            if (!command.example) {general.addField(`**${prefix}${command.use}**`, command.description)}
            else {general.addField(`**${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        ecocommand.forEach(command => {
            if(!command.use) return
            const ecouse = command.use.replace('!m', prefix)
            if (!command.example) {eco.addField(`**${prefix}${command.use}**`, command.description)}
            else {eco.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        admincommand.forEach(command => {
            if(!command.use) return
            const adminuse = command.use.replace('!m', prefix)
            if (!command.example) {admin.addField(`**${prefix}${command.use}**`, command.description)}
            else {admin.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        devcommand.forEach(command => {
            if(!command.use) return
            const devuse = command.use.replace('!m', prefix)
            if (!command.example) {dev.addField(`**${prefix}${command.use}**`, command.description)}
            else {dev.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        funcommand.forEach(command => {
            if(!command.use) return
            const funuse = command.use.replace('!m', prefix)
            if (!command.example) {fun.addField(`**${prefix}${command.use}**`, command.description)}
            else {fun.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        cccommand.forEach(command => {
            if(!command.use) return
            const customuse = command.use.replace('!m', prefix)
            if (!command.example) {cc.addField(`**${prefix}${command.use}**`, command.description)}
            else {cc.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })

        let option1 = {
            label: "General Commands",
            value: "Option 1",
            description: "Display General Commands",
            emoji: "🌐"
        }
        let option2 = {
            label: "Economy Commands",
            value: "Option 2",
            description: "Display Economy Commands",
            emoji: "💰"
        }
        let option3 = {
            label: "Fun Commands",
            value: "Option 3",
            description: "Display Fun Commands",
            emoji: "🎲"
        }
        let option4 = {
            label: "Custom Commands",
            value: "Option 4",
            description: "Display CC Commands",
            emoji: "🖌️"
        }
        let option5 = {
            label: "Admin Commands",
            value: "Option 5",
            description: "Display Admin Commands",
            emoji: "👑"
        }
        let option6 = {
            label: "Developer Commands",
            value: "Option 6",
            description: "Display Developer Commands",
            emoji: "⚙️"
        }
        MSM = new MessageSelectMenu()
            .setCustomId("Selection")
            .setMaxValues(1)
            .addOptions([option1, option2, option3, option4])
        if(message.member.permissions.has("ADMINISTRATOR")){
            MSM.addOptions([option5])
        }
        if(client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("854061604258054214")){
            MSM.addOptions([option6])
        }
        let row = new MessageActionRow().addComponents(MSM)
        let embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle("Please select the help page you'd like to visit")

        let menumsg = await message.channel.send({ embeds: [embed], components: [row]})

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1": 
                    menu.reply({embeds: [general], ephemeral: true})
                break;
                case "Option 2": 
                    menu.reply({embeds: [eco], ephemeral: true})
                break;
                case "Option 3": 
                    menu.reply({embeds: [fun], ephemeral: true})
                break;
                case "Option 4": 
                    menu.reply({embeds: [cc], ephemeral: true})
                break;
                case "Option 5": 
                    menu.reply({embeds: [admin], ephemeral: true})
                break;
                case "Option 6": 
                    menu.reply({embeds: [dev], ephemeral: true})
                break;
            }
        }

        var collector = menumsg.createMessageComponentCollector({time: 60000})
        collector.on("collect", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.member.id == message.author.id) menuselection(menu)
                else menu.reply({content: "Only the message author can interact with this menu!", ephemeral: true})
            }
        })
    }
}