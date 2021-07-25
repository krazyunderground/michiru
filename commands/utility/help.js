const Discord = require("discord.js")
const { MessageMenu, MessageMenuOption } = require(`discord-buttons`)

module.exports = {
    name: "help",
    description: "shows help menus",
    category: "basic",
    use: "!m help",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        // if(!args[1]) return message.reply("Add which page you want to view between 1-4!\n1. Basic commands\n2. Economy commands\n3. Music commands\n4. Admin/Developer")
        const embed = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`));
        let prefix = util.get(`${message.guild.id}.prefix`)

            const basic = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                .setTitle("Command List: Basic")
            //     .addFields(
            //         { name: `**${prefix}help**`, value: `Shows a list of all the commands.` },
            //         { name: `**${prefix}ping**`, value: `View latencies of the bot` },
            //         { name: `**${prefix}google**`, value: `Googles whatever\`s specified` },
            //         { name: `**${prefix}ubdict**`, value: `Gets a defenition from the Urban Dictionary` },
            //         { name: `**${prefix}meme**`, value: `Adds a caption to the attached image` },
            //         { name: `**${prefix}colour**`, value: `Change your prefered embed colour in each guild` }
            //     )

            const eco = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                .setTitle(`Command list: Economy`)
            //     .addFields(
            //         { name: `**${prefix}balance**`, value: `Shows your current balance` },
            //         { name: `**${prefix}mine**`, value: `Allows you to get more quartz` },
            //         { name: `**${prefix}shop**`, value: `Shows the prices and item name of each pickaxe` }
            //     );

            const music = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                .setTitle(`Command list: VC`)
            //     .addFields(
            //         { name: `**${prefix}music play**`, value: `Searches for a youtube video or plays provided video URL` },
            //         { name: `**${prefix}music skip**`, value: `Skips 1 song in the queue` },
            //         { name: `**${prefix}music stop**`, value: `The bot leaves the VC` },
            //     )

            const admin = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                .setTitle(`Command list: Admin/Developer`)
            //     .addFields(
            //         { name: `**${prefix}prefix**`, value: `Changes prefix of the bot for the server` },
            //         { name: `**${prefix}eval (DEV ONLY)**`, value: `Run/evaluate code before implimenting it into the real bot` }
            //     )

            const cc = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
            .setTitle(`Command list: Custom Commands`)
            // .addFields(
            //     { name: `**${prefix}cc-create**`, value: `Allows an admin to create a custom command` },
            //     { name: `**${prefix}cc-delete**`, value: `Allows an admin to remove a custom command` },
            //     { name: `**${prefix}cc-list**`, value: `Shows list of custom commands for that server` }
            // )


        // message.channel.send(embed)

        var basiccommand = new Array()
        var ecocommand = new Array()
        var musiccommand = new Array()
        var admincommand = new Array()
        var cccommand = new Array()

        client.commands.forEach(command => {
            switch(command.category){
                case "basic":
                    basiccommand.push(command)
                break
                case "eco":
                    ecocommand.push(command)
                break
                case "music":
                    musiccommand.push(command)
                break
                case "admin":
                    admincommand.push(command)
                break
                case "cc":
                    cccommand.push(command)
                break
            }
        })

        basiccommand.forEach(command => {
            basic.addField(`**${command.use}**`, command.description)
        })
        ecocommand.forEach(command => {
            eco.addField(`**${command.use}**`, command.description)
        })
        musiccommand.forEach(command => {
            music.addField(`**${command.use}**`, command.description)
        })
        admincommand.forEach(command => {
            admin.addField(`**${command.use}**`, command.description)
        })
        cccommand.forEach(command => {
            cc.addField(`**${command.use}**`, command.description)
        })

        let option1 = new MessageMenuOption()
            .setLabel("Basic Commands")
            .setValue("Option 1")
            .setDescription("Display Basic Commands")
            .setDefault()
            .setEmoji("🌐")
        let option2 = new MessageMenuOption()
            .setLabel("Economy Commands")
            .setValue("Option 2")
            .setDescription("Display Economy Commands")
            .setDefault()
            .setEmoji("💰")
        let option3 = new MessageMenuOption()
            .setLabel("VC Commands")
            .setValue("Option 3")
            .setDescription("Display VC Commands")
            .setDefault()
            .setEmoji("🎵")
        let option4 = new MessageMenuOption()
            .setLabel("Economy Commands")
            .setValue("Option 4")
            .setDescription("Display Admin/Dev Commands")
            .setDefault()
            .setEmoji("👑")
        let option5 = new MessageMenuOption()
            .setLabel("Custom Commands")
            .setValue("Option 5")
            .setDescription("Display CC Commands")
            .setDefault()
            .setEmoji("🖌️")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click here to choose shop page")
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
            .addOption(option4)
            .addOption(option5)
        let embed2 = new Discord.MessageEmbed()
        .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`)).setTitle("Please select help page you'd like to visit")

        let menumsg = await message.channel.send(embed2, selection)

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1": 
                    menu.reply.send(basic, true)
                break;
                case "Option 2": 
                    menu.reply.send(eco, true)
                break;
                case "Option 3": 
                    menu.reply.send(music, true)
                break;
                case "Option 4": 
                    menu.reply.send(admin, true)
                break;
                case "Option 5": 
                    menu.reply.send(cc, true)
                break;
            }
        }

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: Only the message author can interact with the menu", true)
            }
        })
    }
}
    


