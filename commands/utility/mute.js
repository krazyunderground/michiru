const { Message, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'This command mutes members.',
    execute: async (client, message, args, Discord, economy, util) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
        const Member = message.mentions.members.first()
        if (!Member) return message.channel.send('Member is not found.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if (!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')
                let muterole = await message.guild.roles.create(
                    {
                        name: 'muted',
                        permissions: [],

                    }
                );
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role1 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'Community')
        if (Member.roles.cache.has(role1.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
        await Member.roles.add(role1)
        Member.roles.remove(role2)
        message.channel.send(`${Member.displayName} is now muted.`)

    }
}