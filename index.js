const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/accounts', db.getAccounts)
app.get('/accounts/:id', db.getAccountsById)
app.post('/accounts', db.createAccount)
app.put('/accounts/:id', db.updateAccount)
app.delete('/accounts/:id', db.deleteAccount)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})