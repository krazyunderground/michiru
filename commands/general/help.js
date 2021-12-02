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
            const tutorial = new Discord.MessageEmbed().setColor(userutil.colour)
            .setTitle("Tutorial")
            .setDescription("Whether you're just getting started, or need some help along the way. The tutorial has your back!")
            .addFields(
                {name: "Getting Started", value: "The main premise of the bot is to make money and upgrade your gear.\nTo do this, you'll want to use \`!m mine\` and \`!m sellore\`.\n"},
                {name: "Upgrading", value: "There are multiple upgrade types to get.\n**Pickaxe:** To get more, and better, ores you'll want to upgrade your pickaxe with\n\`!m buy\`\n\n**Gear:** You can craft gear with \`!m craft\`\n*although its craftable now, gear's function is still being worked on!*"},
                {name: "Smelting", value: "To upgrade your gear, you'll need to smelt some alloys.\nLuckily, since you already know how to obtain ores, you're halfway there! The next step is to use \`!m smelt\`"},
                {name: "Extras", value: "To view craftables and pickaxe upgrades use, \`!m recipes\` and \`shop\`\nTo view your balance and inventories use \`!m balance\`, \`!m oreinv\`, and \`!m alloyinv\`"},
                {name: "Support", value: "Make sure to join our support server where you can get help, make suggestions, track updates, or just hang out! [Join Here](https://discord.gg/t9yebSe7jg)"}
            )
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
            label: "Tutorial",
            value: "Option 1",
            description: "Display the Tutorial",
            emoji: "📜"
        }
        let option2 = {
            label: "General Commands",
            value: "Option 2",
            description: "Display General Commands",
            emoji: "🌐"
        }
        let option3 = {
            label: "Economy Commands",
            value: "Option 3",
            description: "Display Economy Commands",
            emoji: "💰"
        }
        let option4 = {
            label: "Fun Commands",
            value: "Option 4",
            description: "Display Fun Commands",
            emoji: "🎲"
        }
        let option5 = {
            label: "Custom Commands",
            value: "Option 5",
            description: "Display CC Commands",
            emoji: "🖌️"
        }
        let option6 = {
            label: "Admin Commands",
            value: "Option 6",
            description: "Display Admin Commands",
            emoji: "👑"
        }
        let option7 = {
            label: "Developer Commands",
            value: "Option 7",
            description: "Display Developer Commands",
            emoji: "⚙️"
        }
        MSM = new MessageSelectMenu()
            .setCustomId("Selection")
            .setMaxValues(1)
            .addOptions([option1, option2, option3, option4, option5])
        if(message.member.permissions.has("ADMINISTRATOR")){
            MSM.addOptions([option6])
        }
        if(client.guilds.cache.get("848707853350862858").members.cache.get(message.author.id).roles.cache.has("854061604258054214")){
            MSM.addOptions([option7])
        }
        let row = new MessageActionRow().addComponents(MSM)
        let embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle("Please select the help page you'd like to visit")
        if(message.member.permissions.has("ADMINISTRATOR")){embed.setDescription("*pssst, use the scroll bar to view administrator only commands!*")}
        let menumsg = await message.channel.send({ embeds: [embed], components: [row]})

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1": 
                    menu.reply({embeds: [tutorial], ephemeral: true})
                break;
                case "Option 2": 
                    menu.reply({embeds: [general], ephemeral: true})
                break;
                case "Option 3": 
                    menu.reply({embeds: [eco], ephemeral: true})
                break;
                case "Option 4": 
                    menu.reply({embeds: [fun], ephemeral: true})
                break;
                case "Option 5": 
                    menu.reply({embeds: [cc], ephemeral: true})
                break;
                case "Option 6": 
                    menu.reply({embeds: [admin], ephemeral: true})
                break;
                case "Option 7": 
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