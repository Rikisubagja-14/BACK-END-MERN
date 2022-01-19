const mongoose = require('mongoose')
let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus diisi']    
       },
    name: {
        type: String,
        require: [true, 'Nama harus diisi'],
        maxLength:[255,"panjang nama harus 3-255 karakter"],
    minLength:[3,"panjang nama harus 3-255 karakter"]    
       },
    username: {
        type: String,
        require: [true, 'Nama harus diisi'],
        maxLength:[255,"panjang nama harus 3-255 karakter"],
        minLength:[3,"panjang nama harus 3-255 karakter"]    
       },
    password: {
        type: String,
        require: [true, 'Email harus diisi'],
        maxLength:[255,"panjang password maksimal 255 karakter"],    
       },
       
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user'
    },
    status:{
        type: String,
        enum: ['Y','N'],
        default: 'Y'
    },
    avatar:{type: String},
    fileName:{ type: String},
    phoneNumber: {
        type: String,
        require: [true, 'PhoneNumber harus diisi'],
        maxLength:[13,"panjang nomor telepon harus 9-13 karakter"],
        minLength:[9,"panjang panjang nomor harus 9-13 karakter"]     
    },
    favorite:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'player'
        },
},{timestamp: true})
playerSchema.path('email').validate(async function (value){
    try {
        const count = await this.model('Player').countDocuments({email: value})
   
        return !count
    } catch (err) {
        throw err
    }
   }, attr => `${attr.value} sudah terdaftar`)
   
   playerSchema.pre('save',function (next){
   this.password = bcrypt.hashSync(this.password. HASH_ROUND)
   next()
   } )
module.exports = mongoose.model('Player', playerSchema)