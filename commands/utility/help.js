const Discord = require("discord.js")
const { MessageMenu, MessageMenuOption } = require('discord-buttons')

module.exports = {
    name: "help",
    description: "shows the balance of the user",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        // if(!args[1]) return message.reply("Add which page you want to view between 1-4!\n1. Basic commands\n2. Economy commands\n3. Music commands\n4. Admin/Developer")
        const embed = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`));

                const basic = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                    .setTitle("Command List: Basic")
                    .addFields(
                        { name: '**!m help**', value: 'Shows a list of all the commands.' },
                        { name: '**!m ping**', value: 'View latencies of the bot' },
                        { name: '**!m google**', value: 'Googles whatever\'s specified' },
                        { name: '**!m ubdict**', value: 'Gets a defenition from the Urban Dictionary' },
                        { name: '**!m meme**', value: 'Adds a caption to the attached image' },
                        { name: '**!m colour**', value: 'Change your prefered embed colour in each guild' }
                    )

                const eco = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                    .setTitle('Command list: Economy')
                    .addFields(
                        { name: '**!m balance**', value: 'Shows your current balance' },
                        { name: '**!m mine**', value: 'Allows you to get more quartz' },
                        { name: '**!m shop**', value: 'Shows the prices and item name of each pickaxe' }
                    );

                const music = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                    .setTitle('Command list: Music (\'!m music\')')
                    .addFields(
                        { name: '**m! music play**', value: 'Searches for a youtube video or plays provided video URL' },
                        { name: '**m! music skip**', value: 'Skips 1 song in the queue' },
                        { name: '**m! music stop**', value: 'The bot leaves the VC' },
                    )

                const admin = new Discord.MessageEmbed().setColor(util.get(`${message.guild.id}.${message.author.id}.colour`))
                    .setTitle('Command list: Admin/Developer')
                    .addFields(
                        { name: '**m! prefix**', value: 'Changes prefix of the bot for the server' },
                        { name: '**m! eval (DEV ONLY)**', value: 'Run/evaluate code before implimenting it into the real bot' }
                    )


        // message.channel.send(embed)

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
            .setLabel("Music Commands")
            .setValue("Option 3")
            .setDescription("Display Music Commands")
            .setDefault()
            .setEmoji("🎵")
        let option4 = new MessageMenuOption()
            .setLabel("Economy Commands")
            .setValue("Option 4")
            .setDescription("Display Admin/Dev Commands")
            .setDefault()
            .setEmoji("👑")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click here to choose shop page")
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
            .addOption(option4)
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
    


