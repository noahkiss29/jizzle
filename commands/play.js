const play = require("play-dl")
const {
    AudioPlayerStatus,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require("@discordjs/voice")

module.exports = {
    name: "play",
    description: "Play music from YouTube",
    async execute(msg, args) {
        const connection = joinVoiceChannel({
            channelId: msg.member.voice.channel.id,
            guildId: msg.member.guild.id,
            adapterCreator: msg.member.voice.channel.guild.voiceAdapterCreator,
        })

        let videoTitle = msg.content.trim().split(" ")
        videoTitle.shift()
        videoTitle.join(" ")

        //const stream = ytdl(`${args[0]}`, { filter: 'audioonly' })
        let search = await play.search(videoTitle, { source: { youtube: "video" } })
        let stream = await play.stream(search[0].url)

        const resource = createAudioResource(stream.stream, { inputType: stream.type })
        const player = createAudioPlayer()
        player.play(resource)
        connection.subscribe(player)
        player.on(AudioPlayerStatus.Idle, () => connection.destroy())
        player.on("error", (err) => console.log(err))
    }
}