const mongoose = require('mongoose')
let paymentSchema = mongoose.Schema({
    type: {
        type: String,
        require: [true, 'tipe pembayaran diisi']    
       },
    status:{
        type: String,
        enum: ['Y','N'],
        default: 'Y'
    },
    banks: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Bank'
    }]
},{timestamp: true})
module.exports = mongoose.model('Payment', paymentSchema)