const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    name: "answer",
    description: "I will answer your stupid question",
    execute(msg, args, discord) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        })

        const openai = new OpenAIApi(configuration);

        openai.createCompletion("text-davinci-001", {
            prompt: `Q: Who is Batman?\nA: Batman is a fictional comic book character.\n\nQ: What is torsalplexity?\nA: ?\n\nQ: What is Devz9?\nA: ?\n\nQ: Who is George Lucas?\nA: George Lucas is American film director and producer famous for creating Star Wars.\n\nQ: What is the capital of California?\nA: Sacramento.\n\nQ: What orbits the Earth?\nA: The Moon.\n\nQ: Who is Fred Rickerson?\nA: ?\n\nQ: What is an atom?\nA: An atom is a tiny particle that makes up everything.\n\nQ: Who is Alvan Muntz?\nA: ?\n\nQ: What is Kozar-09?\nA: ?\n\nQ: How many moons does Mars have?\nA: Two, Phobos and Deimos.\n\nQ: ${msg.content.substr(9).trim()}?\nA:`,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        }).then((res) => {
            console.log(res.data)
            if (res.data.choices[0].text === "") {
                const msgEmbed = new discord.MessageEmbed()
                    .setAuthor("Jizzle:")
                    .setTitle(msg.content.substr(9))
                    .setDescription("Be more specific or fuck off bitch!")
                    .setColor("#ffff00")
                    .setTimestamp()
                msg.channel.send({ embeds: [msgEmbed] })
            } else {
                const msgEmbed = new discord.MessageEmbed()
                    .setAuthor("Jizzle:")
                    .setTitle(msg.content.substr(9).trim())
                    .setDescription(res.data.choices[0].text)
                    .setImage("https://i.imgflip.com/2zy8be.jpg")
                    .setColor("#ffff00")
                    .setTimestamp()
                msg.channel.send({ embeds: [msgEmbed] })
            }
        }).catch((err) => console.log(err))
        console.log(msg.content.substr(9))
    }
}