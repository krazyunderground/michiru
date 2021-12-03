module.exports = {
    name: "roles",
    description: "make a role message",
    category: "dev",
    use: "role",
    cooldown: 0,
    maxArgs: 1,
    async execute(client, message, args, Discord, economy, util){
        
        const userutil = await client.functions.get("getUtil").execute(message)

        const embed = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle('Ping Roles')
        .setDescription('<a:announcements:916398514156752916> - Normal Announcements\n<:bot:916398521278677022> - Bot Updates\n<:server:916398528983601162> - Server Changes')
        .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle('Ping Roles')
        .setDescription('<:TorchRed:916400654241648660> - Torch Red\n<:BlazeOrange:916400635472125952> - Blaze Orange\n<:BitterLemon:916400635241447425> - Bitter Lemon\n<:SkyBlue:916400654266810408> - Sky Blue\n<:ClassicRose:916400643390971935>  - Classic Role')
        .setTimestamp()
        const embed3 = new Discord.MessageEmbed()
        .setColor(userutil.colour)
        .setTitle('Flare Roles')
        .setDescription('**Experience Level**\n<:newuser:916410166260412437> - New User\n<:experienced:916410166214279238> - Experienced\n<:veteran:916410174737113088> - Veteran\n\n**Economy Level**\n:chart_with_upwards_trend: - Rich\n:chart_with_downwards_trend:  - Poor')
        .setTimestamp()

        if (args[1] === "pings") {
        const react = await message.channel.send({embeds: [embed]})
        react.react('<a:announcements:916398514156752916>')
        .then(() => react.react('<:bot:916398521278677022>'))
        .then(() => react.react('<:server:916398528983601162>'))
        .catch(err => console.error('failed to react', err))}
        if (args[1] === "color") {
        const react2 = await message.channel.send({embeds: [embed2]})
        react2.react('<:TorchRed:916400654241648660>')
        .then(() => react2.react('<:BlazeOrange:916400635472125952>'))
        .then(() => react2.react('<:BitterLemon:916400635241447425>'))
        .then(() => react2.react('<:SkyBlue:916400654266810408>'))
        .then(() => react2.react('<:ClassicRose:916400643390971935> '))
        .catch(err => console.error('failed to react', err))}
        if (args[1] === "flare") {
        const react3 = await message.channel.send({embeds: [embed3]})
        react3.react('<:newuser:916410166260412437>')
        .then(() => react3.react('<:experienced:916410166214279238>'))
        .then(() => react3.react('<:veteran:916410174737113088>'))
        .then(() => react3.react('📈'))
        .then(() => react3.react('📉'))
        .catch(err => console.error('failed to react', err))}
    }
}
