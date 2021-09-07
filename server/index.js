const greeting = () => 'Welcome to Micro!'

// using https://github.com/dotcypress/micro-route
// to route different requests to their own handlers
const dispatch = require('micro-route/dispatch')

const receive = require('./receive')

module.exports = dispatch()
  .dispatch('/receive', 'POST', receive)
  .otherwise(greeting)
