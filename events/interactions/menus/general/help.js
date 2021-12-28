module.exports = {
    name: 'help',
    async execute(interaction, client, Discord) {
        const message = interaction
        const userutil = await client.functions.get("getUserUtil").execute(interaction.member)

        const guildData = await client.functions.get("guildCheck").execute(message)
        const prefix = guildData.prefix

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
            else {general.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        ecocommand.forEach(command => {
            if(!command.use) return
            if (!command.example) {eco.addField(`**${prefix}${command.use}**`, command.description)}
            else {eco.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        admincommand.forEach(command => {
            if(!command.use) return
            if (!command.example) {admin.addField(`**${prefix}${command.use}**`, command.description)}
            else {admin.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        devcommand.forEach(command => {
            if(!command.use) return
            if (!command.example) {dev.addField(`**${prefix}${command.use}**`, command.description)}
            else {dev.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        funcommand.forEach(command => {
            if(!command.use) return
            if (!command.example) {fun.addField(`**${prefix}${command.use}**`, command.description)}
            else {fun.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        cccommand.forEach(command => {
            if(!command.use) return
            if (!command.example) {cc.addField(`**${prefix}${command.use}**`, command.description)}
            else {cc.addField(`**${prefix}${command.use}**`, `${command.description}\n**Ex:** ${command.example}`)}
        })
        switch(interaction.values[0]) {
            case "Option 1": 
                interaction.reply({embeds: [tutorial], ephemeral: true})
            break;
            case "Option 2": 
            interaction.reply({embeds: [general], ephemeral: true})
            break;
            case "Option 3": 
            interaction.reply({embeds: [eco], ephemeral: true})
            break;
            case "Option 4": 
            interaction.reply({embeds: [fun], ephemeral: true})
            break;
            case "Option 5": 
            interaction.reply({embeds: [cc], ephemeral: true})
            break;
            case "Option 6": 
            interaction.reply({embeds: [admin], ephemeral: true})
            break;
            case "Option 7": 
            interaction.reply({embeds: [dev], ephemeral: true})
            break;
        }
    }
}