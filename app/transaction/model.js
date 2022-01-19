const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName : { type: String, required: [true, 'Nama Game Harus Diisi']},
        category : { type: String, required: [true, 'kategori Harus Diisi']},
        thumbnail : { type: String},
        coinName : { type: String, required: [true, 'Nama Koin Harus Diisi']},
        coinQuantity : { type: String, required: [true, 'Jumlah Coin harus diisi']},
        price : { type: Number },
    },
    historyPayment:{
        name : { type: String, required: [true, 'Nama Harus Diisi']},
        type : { type: String, required: [true, 'Rtype Pembayaran Harus Diisi']},
        bankName : { type: String, required: [true, 'Nama Bank Hrus Diisi Harus Diisi']},
        noRekening : { type: String, required: [true, 'Nomor Rekening  Harus Diisi Harus Diisi']},
    },
    name: {
    type: String,
    required: [true,"Nama Harus Diisi"],
    maxLength:[255,"panjang nama harus 3-255 karakter"],
    minLength:[3,"panjang nama harus 3-255 karakter"]
    },
    accountUser: {
    type: String,
    required: [true,"Nama Akun Harus Diisi"],
    maxLength:[255,"panjang nama harus 3-255 karakter"],
    minLength:[3,"panjang nama harus 3-255 karakter"]
    },
    tax:{
    type: Number,
    default:0,
    },
    value :{
    type: Number,
    default:0,    
    },
    status: {
    type: String,
    enum: ['pending','seccess','failed'],
    default:'pending',
    },
    player:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Player'
    },
    historyUser:{
    name : { type: String, required: [true, 'Nama player Harus Diisi']},
    phoneNumber:{
        type: Number,
        required: [true,"Nama Akun Harus Diisi"],
        maxLength:[13,"panjang nama harus 9-13 karakter"],
        minLength:[9,"panjang nama harus 9-13 karakter"]
    }
    },
    category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Player'
    },
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
    }

},{timestamp: true})
module.exports = mongoose.model('Transaction', transactionSchema)