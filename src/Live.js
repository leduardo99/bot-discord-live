const { Client, Collection } = require('discord.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

module.exports = class Live extends Client {
  constructor (options = {}) {
    super(options)

    this.prefix = options.prefix
    this.commands = new Collection()
  }

  login (token) {
    token = token || process.env.DISCORD_TOKEN
    return super.login(token)
  }

  loadCommands (commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}/${commandName}`))(this)
      console.log(`Comando carregado com sucesso: ${props.name}`)
      props.location = commandPath
      if (props.init) {
        props.init(this)
      }
      this.commands.set(props.name, props)
      // return true
    } catch (error) {
      return console.error(
        `O comando ${commandName.split('.')[0]} não foi carregado ${error}`
      )
    }
  }

  async loadEvents () {
    const evetFiles = await readdir('./src/events')
    evetFiles.forEach(file => {
      const eventName = file.split('.')[0] // ready.js - ready : .js
      const event = new (require(`./events/${file}`))(this)
      console.log(`Evento carregado com sucesso: ${eventName}`)
      this.on(eventName, (...args) => event.run(...args))
    })
  }
}
