import mqtt from 'mqtt'
import * as dotenv from 'dotenv'
import user from './controllers/Users'
import mongoose from 'mongoose'

dotenv.config()

// Variables
const mongoURI = 'mongodb://localhost:27017/users'
const client = mqtt.connect(process.env.MQTT_URI || 'mqtt://localhost:1883')

// Connect to MongoDB
mongoose.connect(mongoURI)

client.on('connect', () => {
  client.subscribe ('auth/create/user')
  client.subscribe ('auth/login/user')
  client.subscribe ('auth/getall/users')
  client.subscribe ('auth/update/users')
  client.subscribe ('auth/delete/user')
  client.publish ('auth/create/user', 'haloo')
})

client.on('message', (topic, message) => {
  switch (topic) {
    case 'auth':
      // eslint-disable-next-line no-console
      console.log(message.toString())
      client.end()
      break
    case 'auth/create/user':
      // call createUser function
      user.createUser('armin', 'balesic', '8906168110', 'balesicarmin@gmail.com', 'Password123', 'Password123', '123456789')
      console.log('Kladdkaka123')
      // eslint-disable-next-line no-console
      break
    case 'auth/login/user':
      // call loginUser function
      break
    case 'auth/getall/users':
      // call getAllUsers function
      break
    case 'auth/update/user':
      // call updateUser function
      break
    case 'auth/delete/user':
      // call deleteUser function
      break
  }
})
