module.exports = (Discord, client, oldPresence, newPresence) => {
    if(newPresence.guild.id !== '848707853350862858') return
    const role = newPresence.guild.roles.cache.get("877644996751265913");
    const member = newPresence.member
    const activities = member.presence.activities[0];

    if (activities && (activities.state.includes( "jippy" ) || activities.state.includes( "stolas" ))) {
      return newPresence.member.roles.add(role)
    } else {
      if(member.roles.cache.get(role.id)) {
        newPresence.member.roles.remove(role)
      }
    }
}
