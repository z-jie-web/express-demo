const express=require('express')

const app = express()

app.get('/',(req, res) => {
  console.log(req, 'reqreq')
  res.send('Hello, world, get')
  res.send(req)
})

app.post('/post',(req, res) => {
  res.send('Hello, world, post')
})

app.put('/put',(req, res) => {
  res.send('Hello, world, put')
})

app.delete('/delete',(req, res) => {
  res.send('Hello, world, delete')
})

app.listen('3000',()=>{
  console.log('listening on')
})