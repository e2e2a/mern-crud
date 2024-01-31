const express = require('express');
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
const User = require('./model/user');
const app = express();
const conn = dbConnect();
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  req.db = conn;
  next();
})
app.get('/', (req, res) => {
  User.find({})
    .then(users =>
      res.json(users)
    )
    .catch(err => res.json(err))
})
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  User.findByIdAndUpdate(id, updateData, {
    new: true
  })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
app.post('/post', async (req, res) => {
  try {
    User.find({ email: req.body.email }).then(users => {
      if (users.length > 0) {
        console.log('Email already exists');
        res.json({ message: 'Email is already used' });
      } else {
        User.create(req.body)
          .then(newUser => res.json(newUser))
          .catch(err => res.json(err));
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/delete/:id', (req,res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

app.listen(8080, () => {
  console.log('server running at port 8080')
})