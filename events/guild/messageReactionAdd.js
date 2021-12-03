module.exports = async (Discord, client, reaction, user) => {
    if(reaction.message.partial) reaction.message.fetch()
    if(reaction.partial) reaction.fetch()

    if(reaction.message.channel.id === "903782506459967508"){
        //announcements
        if(reaction.emoji.id === "916398514156752916"){
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("916391610718257162")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("916391610718257162")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916392139812929589")   
        }
        //bot updates
        if(reaction.emoji.id === "916398521278677022") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("916391610718257162")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("916391610718257162")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916392195727175691")
        }
        //server updates
        if(reaction.emoji.id === "916398528983601162") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("916391610718257162")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("916391610718257162")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916393257716572291")
        }
        //red
        if(reaction.emoji.id === "916400654241648660") {
            reaction.message.guild.members.cache.get(user.id).roles.add("870630244443381770")
        }
        //orange
        if(reaction.emoji.id === "916400635472125952") {
            reaction.message.guild.members.cache.get(user.id).roles.add("870629192398671873")
        }
        //yellow
        if(reaction.emoji.id === "916400635241447425") {
            reaction.message.guild.members.cache.get(user.id).roles.add("870628889720930334")
        }
        //blue
        if(reaction.emoji.id === "916400654266810408") {
            reaction.message.guild.members.cache.get(user.id).roles.add("870628606106288149")
        }
        //pink
        if(reaction.emoji.id === "916400643390971935") {
            reaction.message.guild.members.cache.get(user.id).roles.add("870629599065821225")
        }
        //new
        if(reaction.emoji.id === "916410166260412437") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("875563865453244467")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("875563865453244467")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916390756263002122")
        }
        //experienced
        if(reaction.emoji.id === "916410166214279238") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("875563865453244467")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("875563865453244467")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916391116851535942")
        }
        //veteran
        if(reaction.emoji.id === "916410174737113088") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("875563865453244467")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("875563865453244467")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916391282224533565")
        }
        //rich
        if(reaction.emoji.name === "📈") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("875563865453244467")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("875563865453244467")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916392822784008243")
        }
        //poor
        if(reaction.emoji.name === "📉") {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has("875563865453244467")) {
                reaction.message.guild.members.cache.get(user.id).roles.add("875563865453244467")  
            }
            reaction.message.guild.members.cache.get(user.id).roles.add("916392918082801695")
        }
    }
}