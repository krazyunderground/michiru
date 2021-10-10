module.exports = async (Discord, client) => {
    client.user.setActivity("Hi, im Michiru!", { type: "STREAMING", url: "https://discord.gg/ZPryeUKF73" })
    console.log("Michiru is online!")
}