module.exports = class Ping {
  constructor (client) {
    this.client = client
    this.name = 'ping'
    this.aliases = ['pong', 'testeping']
  }

  async run (message) {
    message.reply('Hello World!')
  }
}
