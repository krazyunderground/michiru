const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

const player = createAudioPlayer()

const queue = new Map();

//this is a modified version of the codelyon music command to work with v13
//by Krazyunderground#0001

module.exports = {
    name: 'music',
    category: "music",
    use: "!m music [play, stop, skip]",
    cooldown: 0,
    description: 'plays music for the user in a VC',
    async execute(client, message, args, Discord, economy, util){

        const cmd = args[1]

        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('I don\'t have the correct permissions!');
        if (!permissions.has('SPEAK')) return message.channel.send('I don\'t have the correct permissions!');

        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play'){
            if (!args.length) return message.channel.send('You need to send the second argument!');
            let song = {};

            if (ytdl.validateURL(args[2])) {
                const song_info = await ytdl.getInfo(args[2]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url , thumbnail: video.thumbnail , channel: video.author , duration: video.duration}
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                try {
                    var connection = await joinVoiceChannel({
                        channelId: voice_channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator
                    })
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }

        else if(cmd === 'skip') skip_song(message);
        else if(cmd === 'stop') stop_song(message);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.connection.destroy()
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    var resource = createAudioResource(stream)
    player.play(resource)
    song_queue.connection.subscribe(player)
    player.on(AudioPlayerStatus.Idle, () => {
        const song_queue = queue.get(guild.id);
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}** - ${song.duration.toString()}`)
}

const skip_song = (message) => {
    const server_queue = queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.songs.shift();
    video_player(message.guild, server_queue.songs[0]);
}

const stop_song = (message) => {
    const { getVoiceConnection } = require('@discordjs/voice');

    const connection = getVoiceConnection(message.guild.id);

    const server_queue = queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!')
    if(server_queue.songs) server_queue.songs = [];
    delete server_queue
    connection.destroy()
}