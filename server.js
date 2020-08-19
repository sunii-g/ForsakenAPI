const express = require('express');
const port = 14100;
const fastify = require('fastify')();
const cdata = require('./modules/getcdata');
const path = require('path');
const cron = require('node-cron');
cdata();
fastify.register(require('fastify-favicon'), { path: './resources' })
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'resources')
  })
fastify.get("/api/moh/data", async (req, res) => {
     let now = new Date();
     let time = now.toLocaleTimeString();
     res
     .header('Content-Type', 'application/json; charset=utf-8')
     .sendFile('cdata.json')
     console.log("CDATA Request From: " + req.ip + " Time: " + time)
 });
 fastify.get("/", (req, res) => {
     res.send("Welcome! This is JaPao's API server. For more infomation, please contact me at https://facebook.com/japeooo. Love <3")
 })
 fastify.listen(port, '0.0.0.0', (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`RESTful API Server by JaPao. Server is now running at ${fastify.server.address().port}`)

  })