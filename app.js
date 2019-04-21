const express = require('express')
const util = require('util')
const cors = require('cors')
const { spawn } = require('child_process')

const app = express()
app.use(express.json())
app.use(cors())

// db.collection("cities").doc("LA").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// })
const admin = require('firebase-admin')

var serviceAccount = require('./test.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

var db = admin.firestore()

app.get('/feed', async (req, res) => {
  const feed = spawn('node', ['test.js'])
  feed.on('exit', exitCode => {
    console.log('exit')
    db.collection('fishtank')
      .doc('sid')
      .update({
        lastfeedtime: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
      })
      .then(e => {
        console.log(e)
      })
  })
  feed.on('error', err => {
    console.log('error in feed')
    res.send('failed to feed')
  })
  feed.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
})

app.get('/light/true', (req, res) => {
  const firstSpawn = spawn('python', ['lighton.py'])
  firstSpawn.on('exit', exitCode => {
    console.log('exit')
    db.collection('fishtank')
      .doc('sid')
      .update({
        light: 'on'
      })
      .then(e => {
        res.send('success on yay')
      })
  })
  firstSpawn.on('error', err => {
    console.log('error in light on')
    res.send('failed to turn light on')
  })
  firstSpawn.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
})
// try {
//   exec('python lighton.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
//     console.log(stdout)
//   })
// } catch (e) {}

app.get('/light/false', (req, res) => {
  const firstSpawn = spawn('python', ['lightoff.py'])
  firstSpawn.on('exit', exitCode => {
    console.log('exit')
    db.collection('fishtank')
      .doc('sid')
      .update({
        light: 'off'
      })
      .then(e => {
        res.send('success light off yay')
      })
  })
  firstSpawn.on('error', err => {
    console.log('error in light off')
    res.send('failed to turn light off')
  })
  firstSpawn.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
})
app.get('/waterlevel', (req, res) => {
  const waterLevelProcess = spawn('python', ['ultrasonic.py'])
  const waterlevel = ''
  waterLevelProcess.on('exit', exitCode => {
    console.log('exit')
    db.collection('fishtank')
      .doc('sid')
      .update({
        waterlevel
      })
      .then(e => {
        res.send('success')
      })
  })
  waterLevelProcess.on('exit', exitCode => {
    console.log('exit')
    res.send('error getting waterlevel')
  })
  waterLevelProcess.stdout.on('data', data => {
    waterlevel = data.substring(10, 12)
    console.log(`stdout: ${data}`)
  })
})

app.get('/water1/true', (req, res) => {
  const waterSupply = spawn('node', ['test.js'])
  waterSupply.on('exit', exitCode => {
    console.log('exit')
  })
  waterSupply.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
})
app.get('/water1/false', (req, res) => {
  const waterSupply = spawn('node', ['test.js'])
  waterSupply.on('exit', exitCode => {
    console.log('exit')
  })
  waterSupply.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
