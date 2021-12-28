const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`)

module.exports = {
    name: "help",
    gitlink: "https://github.com/krazyunderground/michiru/tree/main/commands/utility/help.js",
    description: "shows help menus",
    category: "general",
    use: "test",
    cooldown: 0,
    async execute(client, message, args, Discord){
        const userutil = await client.functions.get("getUserUtil").execute(message.member)
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
            .setCustomId("help")
            .setMaxValues(1)
            .addOptions([option1, option2, option3, option4, option5])
        if(message.member.permissions.has("ADMINISTRATOR")){
            MSM.addOptions([option6])
        }
        if(client.guilds.cache.get("848707853350862858").members.cache.get(message.member.user.id).roles.cache.has("854061604258054214")){
            MSM.addOptions([option7])
        }
        let row = new MessageActionRow().addComponents(MSM)
        let embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle("Please select the help page you'd like to visit")
        if(message.member.permissions.has("ADMINISTRATOR")){embed.setDescription("*pssst, use the scroll bar to view administrator only commands!*")}
        message.reply({ embeds: [embed], components: [row]})
    }
}