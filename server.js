const http = require('http');
// const https = require('https')

const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const port = process.env.PORT || 3000;
console.log(port)
const server = http.createServer(app);
//https.createServer(app).listen(443)
server.listen(port);
//console.log(server)

