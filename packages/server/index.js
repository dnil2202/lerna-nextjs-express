const express = require('express')
const app = express()
const PORT = 2000;


app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send(`<h1>express from lerna </h1>`)
})

app.listen(PORT,()=>console.log(`Running API at ${PORT}`))