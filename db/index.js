const mongoose = require('mongoose')
const { urlDb } = require('../config')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/db_bwa_store_gg');
}


const db = mongoose.connection

module.exports = db;