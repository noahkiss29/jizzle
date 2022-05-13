const Axios = require("axios")

module.exports = {
    name: "waifu",
    description: "Waifu images command",
    execute(msg, args, discord) {
        Axios.get(`https://api.waifu.im/random/?selected_tags=${args[0]}&is_nsfw=false`)
            .then((res) => {
                const msgEmbed = new discord.MessageEmbed()
                    .setAuthor("Waifus:")
                    .setDescription(`Some Waifu images for you weebs with the tag ${args[0]}`)
                    .setImage(res.data.images[0].url)
                    .setColor("#ffff00")
                    .setTimestamp()
                msg.channel.send({ embeds: [msgEmbed] })
            }).catch((err) => console.log(err))
    }
}