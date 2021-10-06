module.exports = async (Discord, client) => {
    console.log(await client.functions.get("getUtil").execute("576470929874616330"))

    client.user.setActivity("Hi, im Michiru!", { type: "STREAMING", url: "https://discord.gg/ZPryeUKF73" })
    console.log("Michiru is online!")
}