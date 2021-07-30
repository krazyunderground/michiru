const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`)

module.exports = {
    name: "help",
    description: "shows help menus",
    category: "basic",
    use: "!m help",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        // if(!args[1]) return message.reply("Add which page you want to view between 1-4!\n1. Basic commands\n2. Economy commands\n3. Music commands\n4. Admin/Developer")
        const embed = new Discord.MessageEmbed().setColor(util.get(`${message.author.id}.colour`));
        let prefix = util.get(`${message.guild.id}.prefix`)

            const basic = new Discord.MessageEmbed().setColor(util.get(`${message.author.id}.colour`))
                .setTitle("Command List: Basic")
            //     .addFields(
            //         { name: `**${prefix}help**`, value: `Shows a list of all the commands.` },
            //         { name: `**${prefix}ping**`, value: `View latencies of the bot` },
            //         { name: `**${prefix}google**`, value: `Googles whatever\`s specified` },
            //         { name: `**${prefix}ubdict**`, value: `Gets a defenition from the Urban Dictionary` },
            //         { name: `**${prefix}meme**`, value: `Adds a caption to the attached image` },
            //         { name: `**${prefix}colour**`, value: `Change your prefered embed colour in each guild` }
            //     )

            const eco = new Discord.MessageEmbed().setColor(util.get(`${message.author.id}.colour`))
                .setTitle(`Command list: Economy`)
            //     .addFields(
            //         { name: `**${prefix}balance**`, value: `Shows your current balance` },
            //         { name: `**${prefix}mine**`, value: `Allows you to get more quartz` },
            //         { name: `**${prefix}shop**`, value: `Shows the prices and item name of each pickaxe` }
            //     );

            const music = new Discord.MessageEmbed().setColor(util.get(`${message.author.id}.colour`))
                .setTitle(`Command list: VC`)
            //     .addFields(
            //         { name: `**${prefix}music play**`, value: `Searches for a youtube video or plays provided video URL` },
            //         { name: `**${prefix}music skip**`, value: `Skips 1 song in the queue` },
            //         { name: `**${prefix}music stop**`, value: `The bot leaves the VC` },
            //     )

            const admin = new Discord.MessageEmbed().setColor(util.get(`${message.author.id}.colour`))
                .setTitle(`Command list: Admin/Developer`)
            //     .addFields(
            //         { name: `**${prefix}prefix**`, value: `Changes prefix of the bot for the server` },
            //         { name: `**${prefix}eval (DEV ONLY)**`, value: `Run/evaluate code before implimenting it into the real bot` }
            //     )

            const cc = new Discord.MessageEmbed().setColor(util.get(`${message.author.id}.colour`))
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

        let option1 = {
            label: "Basic Commands",
            value: "Option 1",
            description: "Display Basic Commands",
            emoji: "🌐"
        }
        let option2 = {
            label: "Economy Commands",
            value: "Option 2",
            description: "Display Economy Commands",
            emoji: "💰"
        }
        let option3 = {
            label: "Music Commands",
            value: "Option 3",
            description: "Display Music Commands",
            emoji: "🎵"
        }
        let option4 = {
            label: "Admin/Dev Commands",
            value: "Option 4",
            description: "Display Admin/Dev Commands",
            emoji: "👑"
        }
        let option5 = {
            label: "Custom Commands",
            value: "Option 5",
            description: "Display CC Commands",
            emoji: "🖌️"
        }
        let row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("Selection")
                .setMaxValues(1)
                .addOptions([option1, option2, option3, option4, option5])
        )
        let embed2 = new Discord.MessageEmbed()
        .setColor(util.get(`${message.guild.id}.${message.author.id}.colour`)).setTitle("Please select help page you'd like to visit")

        let menumsg = await message.channel.send({content: "**NOTE: Due to the v13 upgrade, if any of the commands dont work, __PLEASE__ report them to Krazyunderground#0001**", embeds: [embed2], components: [row]})

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1": 
                    menu.reply({embeds: [basic], ephemeral: true})
                break;
                case "Option 2": 
                    menu.reply({embeds: [eco], ephemeral: true})
                break;
                case "Option 3": 
                    menu.reply({embeds: [music], ephemeral: true})
                break;
                case "Option 4": 
                    menu.reply({embeds: [admin], ephemeral: true})
                break;
                case "Option 5": 
                    menu.reply({embeds: [cc], ephemeral: true})
                break;
            }
        }

        var collector = menumsg.createMessageComponentCollector({time: 60000})
        collector.on("collect", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.member.id == message.author.id) menuselection(menu)
                else menu.reply(":x: Only the message author can interact with the menu", true)
            }
        })
    }
}