const Live = require('./Live')
const klaw = require('klaw')
const path = require('path')
const mongoose = require('mongoose')

const client = new Live({
  prefix: '>>'
})

const init = async () => {
  klaw('./src/commands').on('data', item => {
    const cmdFile = path.parse(item.path)
    if (!cmdFile.ext || cmdFile.ext !== '.js') return
    const response = client.loadCommands(
      cmdFile.dir,
      `${cmdFile.name}${cmdFile.ext}`
    )
    if (response) console.error(response)
  })

  await client.loadEvents()

  client.login()

  mongoose
    .connect(process.env.MONGO_ACCESS, { useNewUrlParser: true })
    .then(() => {
      console.log('[DATABASE] Conexão estabilizada com sucesso!')
    })
    .catch(error => {
      console.error(error)
    })
}

init()
