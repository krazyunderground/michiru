module.exports = async (Discord, client, reaction, user) => {
    if(reaction.message.partial) {try {await reaction.message.fetch()}catch (err) {return}}
    if(reaction.partial) {try {await reaction.fetch()}catch (err) {return}}

    if(reaction.message.channel.id === "903782506459967508"){
        //announcements
        if(reaction.emoji.id === "916398514156752916"){
            reaction.message.guild.members.cache.get(user.id).roles.remove("916392139812929589").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Updates", "Announcements", "Server"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("916391610718257162")
                    }
                })
        }
        //bot updates
        if(reaction.emoji.id === "916398521278677022") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916392195727175691").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Updates", "Announcements", "Server"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("916391610718257162")
                    }
                })
        }
        //server updates
        if(reaction.emoji.id === "916398528983601162") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916393257716572291").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Updates", "Announcements", "Server"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("916391610718257162")
                    }
                })
        }
        //red
        if(reaction.emoji.id === "916400654241648660") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("870630244443381770")
        }
        //orange
        if(reaction.emoji.id === "916400635472125952") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("870629192398671873")
        }
        //yellow
        if(reaction.emoji.id === "916400635241447425") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("870628889720930334")
        }
        //blue
        if(reaction.emoji.id === "916400654266810408") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("870628606106288149")
        }
        //pink
        if(reaction.emoji.id === "916400643390971935") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("870629599065821225")
        }
        //new
        if(reaction.emoji.id === "916410166260412437") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916390756263002122").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Veteran", "Experienced", "New User", "Rich", "Poor"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("875563865453244467")
                    }
                })
        }
        //experienced
        if(reaction.emoji.id === "916410166214279238") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916391116851535942").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Veteran", "Experienced", "New User", "Rich", "Poor"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("875563865453244467")
                    }
                })
        }
        //veteran
        if(reaction.emoji.id === "916410174737113088") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916391282224533565").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Veteran", "Experienced", "New User", "Rich", "Poor"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("875563865453244467")
                    }
                })
        }
        //rich
        if(reaction.emoji.name === "📈") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916392822784008243").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Veteran", "Experienced", "New User", "Rich", "Poor"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("875563865453244467")
                    }
                })
        }
        //poor
        if(reaction.emoji.name === "📉") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("916392918082801695").then(() => {
                if (!reaction.message.guild.members.cache.get(user.id).roles.cache.some(r=>["Veteran", "Experienced", "New User", "Rich", "Poor"].includes(r.name)) ) {
                    reaction.message.guild.members.cache.get(user.id).roles.remove("875563865453244467")
                    }
                })
        }
    }
}