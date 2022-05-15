const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs");
const schedule = require("node-schedule")
require("dotenv").config()   

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES
  ],
})

client.commands = new Discord.Collection()

const prefix = "--"

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");

  client.user.setPresence({
    activities: [{
      name: `with your mom! (Type "//help")`,
      type: "PLAYING"
    }]
  })
  schedule.scheduleJob("0 12 * * * ", () => {
    axios.get(`https://gnews.io/api/v4/top-headlines?token=${process.env.GNEWS_KEY}&lang=en`)
      .then((res) => {
        res.data.articles.map((item) => (
          client.channels.cache.get('945294353407033395').send({
            embeds: [new Discord.MessageEmbed()
              .setAuthor("Jizzles News Report:")
              .setTitle(item.title)
              .setThumbnail("https://i.imgflip.com/4/en2nv.jpg")
              .setDescription(`${item.description} \n ${item.url}`)
              .setImage(item.image)
              .setColor("#ffff00")
              .setTimestamp()]
          })
        ))
      }).catch((err) => console.log(err))
    console.log("hello")
  })
});

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return

  const args = msg.content.slice(prefix.length).split(" ")
  const cmd = args.shift().toLowerCase()
  try {
    client.commands.get(cmd).execute(msg, args, Discord)
  } catch (err) {
    console.log(err)
    msg.channel.send("Command does not exist!")
  }
})

client.login(process.env.DISCORD_KEY)