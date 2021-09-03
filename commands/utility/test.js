module.exports = {
    name: "test",
    category: "basic",
    use: "!m test",
    cooldown: 0,
    description: "test",
    async execute(client, message, args, Discord, economy, util){
        const obj = {
            armor: {
                stellitehelmet: ["yus"],
                stellitechestplate: ["nu"],
                yes: ["yes"]
            },
        }
        
        if(!args[3]) args[3] = ""
        const query =`${args[2]}${args[3]}`
        if(!args[1]) return console.log(-1)
        if(!args[2]) return console.log(0)
        if(!obj[args[1]]) return console.log(1)
        if(!obj[args[1]][query]) return console.log(2)
        if(!obj[args[1]][query][0]) return console.log(3)
        const chosen = obj[args[1]][query][0]
        
        console.log(chosen)
    }
}