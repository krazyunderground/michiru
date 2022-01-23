const chalk = require('chalk')
module.exports = async (Discord, client) => {
    client.user.setActivity("Hi, im Michiru!", { type: "STREAMING", url: "https://discord.gg/ZPryeUKF73" })
    console.log(chalk.hex('#f2c13b').bold(`Logged in as ${client.user.username}`))
}