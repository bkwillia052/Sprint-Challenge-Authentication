const axios = require('axios');

const { authenticate } = require('./middlewares');
const knexConfig = require('../knexfile');
const knex = require('knex');
const keys = require('../_secrets/keys')
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const secret = keys.jwtKey

//GENERATE WEBTOKEN
function generateToken(user){
  payload = {
    ...user
  }
  options = {
    expiresIn: '5m'
  }

  return jwt.sign(payload, secret, options)
}

async function register(req, res) {
  // implement user registration
  let user = {username, password} = req.body;
  let hash = bcrypt.hashSync(user.password, 14)
  user.password = hash;
  try {
    let exUser = await db('users').where({username}).first()
    if(!exUser){
      let newUser = await db('users').insert(user);
      res.status(200).json({message: 'Registration Successful.', newUser})
    }
    else {
      res.status(400).json({message: 'The username you supplied already exists.'})
    }
    }

  catch(err){
    res.status(500).json({message: 'An error occurred. Please try again later.'})
  }
  
  
}

async function login(req, res) {
  // implement user login
  let user = req.body;
  console.log(user)
  try{
    let exUser = await db('users').where({username: user.username}).first();
    console.log(bcrypt.compareSync(user.password, exUser.password))  

    if(exUser && bcrypt.compareSync(user.password, exUser.password)){
      
      const token = generateToken(exUser);
      console.log(token)
      res.status(200).json({message: `Welcome, ${user.username}!`, token})
    }
    else {
      res.status(404).json({message: 'Login failed.'})
    }
  }
  catch(err){
    console.dir(err)
    res.status(500).json({message: 'An error occured. Please register or try again.'})
  }

}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
