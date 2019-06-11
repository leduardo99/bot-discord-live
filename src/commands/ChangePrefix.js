const GuildController = require('../controllers/Guild')

module.exports = class Ping {
  constructor (client) {
    this.client = client
    this.name = 'prefix'
    this.aliases = ['changeprefix', 'mudarprefixo']
  }

  async run ({ channel, guild }, args) {
    if (!args[0]) {
      return channel.send('Você deve informar o prefixo a ser trocado!')
    }

    GuildController.changePrefix(guild, args[0]).then(() => {
      channel.send('O prefixo da guild foi alterado com sucesso!')
    })
  }
}
