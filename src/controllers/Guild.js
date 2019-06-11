const Guild = require('../models/Guild')

module.exports = {
  async store (server) {
    // Server = Guild
    const guild = await Guild.create({
      _id: server.id
    })

    return console.log(`[DATABASE] Guild salva com sucesso: ${server.id}`)
  },

  async retrivePrefix (server) {
    const guild = await Guild.findById({
      _id: server.id
    })

    return guild.prefix
  },

  async changePrefix (server, prefix) {
    const guild = await Guild.findOneAndUpdate(
      {
        _id: server.id
      },
      {
        prefix: prefix
      }
    )

    return console.log(
      `O prefixo da guild [${server.id}] foi mudado para: ${prefix}`
    )
  }
}
