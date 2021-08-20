const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: `rps`,
	data: new SlashCommandBuilder()
	.setName(`rps`)
	.setDescription(`Rock Paper Scissors!`)
	.addStringOption(option =>
		option.setName(`choice`)
			.setDescription(`What you choose`)
			.setRequired(true)
			.addChoice(`Rock`, `rock`)
			.addChoice(`Paper`, `paper`)
			.addChoice(`Scissors`, `scissors`)),
    /*...*/
	async execute(interaction) {
        
        const responses = [`rock`, `paper`, `scissors`]
        const random = Math.floor(Math.random() * responses.length);
        const result = responses[random]

        const choice = interaction.options.getString(`choice`)
        if (!choice) return interaction.reply(`Please select rock, paper, or scissors!`)
        if (!responses.includes(choice)) return interaction.reply(`Please select rock, paper, or scissors!`)
        if (result === choice) return interaction.reply(`Its a tie!\nYou chose \`${choice}\`, and I chose \`${result}\`!`)
        switch (result) {
            case `rock`: 
                if (choice === `scissors`) return interaction.reply(`I won with \`${result}\`!\nYou chose \`${choice}\`!`);
                else return interaction.reply(`You won, I chose \`${result}\`!\nYou chose \`${choice}\`!`);
            break
            
            case `paper`: 
                if (choice === `rock`) return interaction.reply(`I won with \`${result}\`!\nYou chose \`${choice}\`!`);
                else return interaction.reply(`You won, I chose \`${result}\`!\nYou chose \`${choice}\`!`);        
            break

            case `scissors`: 
                if(choice === `paper`) return interaction.reply(`I won with \`${result}\`!\nYou chose \`${choice}\`!`);
                else return interaction.reply(`You won, I chose \`${result}\`\nYou chose \`${choice}\`!`);
            break
            default: {
                return interaction.reply(`Please select rock, paper, or scissors!`);
            }
        }
	},
};