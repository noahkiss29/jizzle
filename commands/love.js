const axios = require("axios")

module.exports = {
    name: "love",
    description: "Love calculator",
    execute(msg, args, discord) {
        axios.get("https://love-calculator.p.rapidapi.com/getPercentage", {
            params: {
                sname: args[0],
                fname: args[1]
            },
            headers: {
                'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
                'x-rapidapi-key': process.env.LOVE_KEY
            }
        }).then((res) => {
            const msgEmbed = new discord.MessageEmbed()
                .setAuthor("Jizzles love calculator:")
                .setTitle(`${args[0]} + ${args[1]}`)
                .setDescription(`${res.data.percentage}% compatibility. \n ${res.data.result}`)
                .setImage("https://cdn.kapwing.com/video_image-XkTayW7iA.jpg")
                .setColor("#ffff00")
                .setTimestamp()
            msg.channel.send({ embeds: [msgEmbed] })
        }).catch((err) => console.log(err))
    }
}