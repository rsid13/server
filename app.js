const express = require('express')
const util = require('util')
const cors = require('cors')
const exec = util.promisify(require('child_process').execSync)

const app = express()
app.use(express.json())
app.use(cors())

// db.collection("cities").doc("LA").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// })
const admin = require('firebase-admin')

var serviceAccount = require('path/to/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

var db = admin.firestore()

async function execute(cmd) {
  const { stdout } = await exec(cmd, { stdio: 'inherit' })
  console.log(stdout)
}

app.get('/feed', async (req, res) => {
  exec('python feeder.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
    console.log(stdout)
  })
  res.send('gg')
})

app.get('/light/true', (req, res) => {
  exec('python lighton.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
    console.log(stdout)
    // db.collection('fishtank')
    //   .doc('sid')
    //   .update({
    //     light: 'off'
    //   })
  })
  res.send('success on')
})
app.get('/light/false', (req, res) => {
  exec('python light.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
    console.log(stdout)
  })
  res.send('success off')
})
app.get('waterlevel', (req, res) => {
  exec('python ultrasonic.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
    console.log(stdout)
    res.send(stdout.substring(10, 12))
  })
})

app.get('/water1/true', (req, res) => {
  exec('python lighton.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
    console.log(stdout)
  })
  res.send('success on')
})
app.get('/water1/false', (req, res) => {
  exec('python light.py', { stdio: 'inherit' }, (err, stdout, stderr) => {
    console.log(stdout)
  })
  res.send('success off')
})

const port = 3000
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
