// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users)
    })
    .catch(({ code, message }) => {
      res.status(code).send(message)
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      res.json(user)
    })
    .catch(({ code, message }) => {
      res.status(code).send(message)
    })
})

server.post('/api/users', (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  db.update(id, user)
    .then(updatedUser => {
      if(updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ err: 'incorrect id'})
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message })
    })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedUser => {
      res.json(removedUser);
    })
    .catch(({ code, message }) => {
      res.status(code).json(message)
    })
})

server.listen(5000, () => {
  console.log('server listening on port 5000')
})