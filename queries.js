const { v4: uuidv4 } = require('uuid');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'cms',
  host: 'localhost',
  database: 'cms',
  password: 'cms',
  port: 5439,
})

const getAccounts = (request, response) => {
  // NOTE: limitado aos primeiros 500
  pool.query('SELECT * FROM accounts ORDER BY id DESC LIMIT 500', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAccountsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAccount = (request, response) => {
  const { nickname, status } = request.body
  const guid = uuidv4()

  pool.query('INSERT INTO accounts (nickname, status, guid) VALUES ($1, $2, $3) RETURNING id', [nickname, status, guid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Accounts added with ID: ${results.rows[0].id}`)
  })
}

const updateAccount = (request, response) => {
  const id = parseInt(request.params.id)
  const { nickname, status } = request.body

  pool.query(
    'UPDATE accounts SET nickname = $1, status = $2 WHERE id = $3',
    [nickname, status, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteAccount = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getAccounts,
  getAccountsById,
  createAccount,
  updateAccount,
  deleteAccount,
}