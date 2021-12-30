const userEcon = require("../../../../../models/userEcon");
module.exports = {
    name: 'transfer',
    async execute (interaction, client, Discord) {
        interaction.deferUpdate();
        const memberBal = await client.functions
          .get("getUserEcon")
          .execute(interaction.member);
        const userutil = await client.functions
          .get("getUserUtil")
          .execute(interaction.member);
        const filter = (m) => (m.author.id === interaction.user.id);
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });
        let notifmsg = await interaction.channel.send({content: "How much would you like to transfer, and who is it going to? ||<amount> @user||" })
        let amount;
        collector.on("collect", async (m) => {
          const person = m.mentions.users.first()
          args = m.content.split(" ")
          if (isNaN(args[0])) {
            notifmsg.delete()
            m.delete()
            interaction.channel.send({ content: "*Don't forget to give me a transfer amount!*" })
            return
          } else if(parseInt(args[0]) < 1){
            notifmsg.delete()
            m.delete()
            interaction.channel.send({ content: "You can't transfer *negative* coins!" })
            return 
          }else if(!person){
            notifmsg.delete()
            m.delete()
            interaction.channel.send({ content: "Don't forget to mention a person!" })
            return 
          } else {
              var amount = args[0]
              m.delete();
              notifmsg.delete()
              personBal = client.functions.get("getUserEcon").execute(person)

              personBank = parseInt(personBal.bank) + parseInt(amount);
              newBank = parseInt(memberBal.bank) - parseInt(amount);

              await userEcon.findOneAndUpdate(
                  { userID: interaction.user.id },
                  { $inc: { bank: -amount } }
              )
              await userEcon.findOneAndUpdate(
                  { userID: person.id },
                  { $inc: { bank: amount } }
              )
              const row = new Discord.MessageActionRow().addComponents(
                  new Discord.MessageButton()
                      .setCustomId("deposit")
                      .setLabel("Deposit")
                      .setStyle("SUCCESS")
                      .setEmoji("📨"),
                  new Discord.MessageButton()
                      .setCustomId("withdrawl")
                      .setLabel("Withdrawl")
                      .setStyle("DANGER")
                      .setEmoji("🏧"),
                  new Discord.MessageButton()
                      .setCustomId("transfer")
                      .setLabel("Transfer")
                      .setStyle("PRIMARY")
                      .setEmoji("🤝")
                  );
              const embed = new Discord.MessageEmbed()
                  .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
                  .setTitle(`${interaction.user.username}'s Bank!`)
                  .setDescription(`\n**__🏦 ${interaction.user.username} has \`${newBank}\` coins in the bank! 🏦__**\n\nUse the buttons below to interact with your bank account!`)
                  .setTimestamp()
                  .setFooter("💸", client.user.displayAvatarURL())
                  .setColor(`${userutil.colour}`);
              interaction.message.edit({ embeds: [embed], components: [row] });
              let finmsg = await interaction.channel.send(`Successfully made a transfer of ${amount} coins to ${person.username}, you have ${newBank} left in your bank.`);
              setTimeout(() => {
                  finmsg.delete();
              }, 5000);
          }
        });
        collector.on("end", async (collected) => {
            if (collected.size == 0) {
              let timemsg = await interaction.channel.send({
                content: "You didn't provide a transfer amount or person in time! Try again.",
              });
              return;
            }
            if(memberBal.bank < amount){
                
            }
        })
        
        
    }
}