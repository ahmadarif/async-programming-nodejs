const express = require('express')
const { promisify } = require('util')
const { readFile } = require('fs')
const app = express()
const port = 3000

const readFileAsync = promisify(readFile)

const unblock = async () => new Promise(resolve => setImmediate(resolve))

app.get('/', async (req, res) => {
  const content1 = await readFileAsync('file1.md', 'utf-8')
  const content2 = await readFileAsync(content1, 'utf-8')

  let randomNumber = 0
  for (let i=0; i < 1000000; i++) {
    for (let j=0; j < 1000000; j++) {
      randomNumber = Math.random() * 1000
      await unblock()
    }
  }

  res.send({
    message: content2,
    randomNumber: randomNumber
  })
})

app.get('/hi', (req, res) => res.send('Hi!'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})