/* eslint-disable no-unused-expressions */
const GuildController = require('../controllers/Guild')
module.exports = class Message {
  constructor (client) {
    this.client = client
  }

  async run (message) {
    const prefix = await this.getPrefix(message)

    if (message.author.bot) return

    const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`)
    message.content.match(prefixMention)
      ? message.reply(`Meu prefixo é: ${prefix}`)
      : null

    if (message.content.indexOf(prefix) !== 0) return
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)

    const command = args.shift().toLowerCase()

    const cmd = this.client.commands.find(
      c =>
        c.name.toLowerCase() === command ||
        (c.aliases && c.aliases.includes(command))
    )

    if (!cmd) return

    cmd.run(message, args)
  }

  async getPrefix (message) {
    const guild = message.guild
    const prefix = await GuildController.retrivePrefix(guild)
    if (this.client.prefix && prefix) {
      return prefix
    } else if (this.client.prefix && !prefix) {
      return this.client.prefix
    } else if (!this.client.prefix && !prefix) {
      return '>>'
    } else {
      return false
    }
  }
}
