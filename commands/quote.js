const Axios = require("axios")

module.exports = {
    name: "quote",
    description: "Quote command",
    execute(msg, args, discord) {
        Axios.get("https://type.fit/api/quotes")
            .then((res) => {
                let randomNum = Math.floor(Math.random() * res.data.length)
                const msgEmbed = new discord.MessageEmbed()
                    .setAuthor("Inspiring Quote:")
                    .setTitle(`-${res.data[randomNum].author}`)
                    .setImage("https://i.kym-cdn.com/entries/icons/original/000/038/189/Screen_Shot_2021-08-31_at_2.45.07_PM.png")
                    .setDescription(`"${res.data[randomNum].text}" -${res.data[randomNum].author}"`)
                    .setColor("#ffff00")
                    .setTimestamp()
                msg.channel.send({ embeds: [msgEmbed] })
            }).catch((err) => console.log(err))
    }
}