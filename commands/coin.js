module.exports = {
    name: "coin",
    description: "Toss a coin.",
    execute(msg, args, discord) {
        if (Math.floor(Math.random() * 2) === 0) {
            const msgEmbed = new discord.MessageEmbed()
                .setAuthor("Jizzle:")
                .setDescription("The sacred coin toss for you sons of bitches is Head")
                .setImage("https://i.imgflip.com/20ikgl.jpg")
                .setColor("#ffff00")
                .setTimestamp()
            msg.channel.send({ embeds: [msgEmbed] })
        } else {
            const msgEmbed = new discord.MessageEmbed()
                .setAuthor("Jizzle:")
                .setDescription("The sacred coin toss for you sons of bitches is Tails")
                .setImage("https://i.imgflip.com/20ikgl.jpg")
                .setColor("#ffff00")
                .setTimestamp()
            msg.channel.send({ embeds: [msgEmbed] })
        }
    }
}