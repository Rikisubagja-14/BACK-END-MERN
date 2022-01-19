const mongoose = require('mongoose')
let bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama Pemilik harus diisi']    
       },
    bankName:{
        type: String,
        require: [true, 'Nama Bank harus diisi']    
    },
    noRekening: {
        type: String,
        require: [true, 'No Rekening harus diisi']    
    }
},{timestamp: true})
module.exports = mongoose.model('Bank', bankSchema)