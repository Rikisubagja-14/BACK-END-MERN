const mongoose = require('mongoose')
let nominalSchema = mongoose.Schema({
    coinName: {
        type: String,
        require: [true, 'Nama coin harus diisi']    
       },
    coinQuantity:{
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
},{timestamp: true})
module.exports = mongoose.model('Nominal', nominalSchema)