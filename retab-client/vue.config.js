const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv')

dotenv.config({});

/** @type {import('vue').AppConfig} */
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_DEV_PORT
  }
})
