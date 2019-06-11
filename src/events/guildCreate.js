/* eslint-disable no-unused-expressions */
const GuildController = require('../controllers/Guild')

module.exports = class GuildCreate {
  constructor (client) {
    this.client = client
  }

  async run (guild) {
    await GuildController.store(guild)
  }
}
