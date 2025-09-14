const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apps : [{
    name   : process.env.PM2_APP_NAME || 'retab',
    script : "./app.js"
  }]
}