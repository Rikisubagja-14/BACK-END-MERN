const Player = require('../player/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
    signup : async (req, res) =>{
        try {
            const payload = req.body

            if(req.file){
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length -1];
                let filename = req.file.filename +'.'+ originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path)
                const dest= fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        const palyer = new Player({... paylpad,avatar: filename
                        })
                        await palyer.save();
                        delete player._doc.password

                        res.status(201).json({data: player})    
                    } catch (err) {
                        if(err && err.message === "validation Error"){
                            return res.status(422).json({
                                error: 1,
                                message: err.message,
                                fields: err.errors,
                            })
                         }
                    }
                })
            }else{
                let player = new Player(payload)

                await player.save();

                delete player._doc.password

                res.status(201).json({data: player})
            }

        } catch (err) {
            if(err && err.message === "validation Error"){
               return res.status(422).json({
                   error: 1,
                   message: err.message,
                   fields: err.errors,
               })
            }
        }
    },

    signin: async (req, res, next) =>{
       
            const {email,password} = req.body

            Player.findOne({email: email}).then((player)=>{
            if(player){
                const checkPassword = bcrypt.compareSync(password, player.password)
                if(checkPassword){
                    const token = jwt.sign({
                        player :{
                            id: player.id,
                            username: player.username,
                            email: player.email,
                            nama: player.nama,
                            phoneNumber: player.phoneNumber,
                            avatar: player.avatar,

                        }
                    }, config.jwtkey)
                    res.status(200).json({data : {token}})
                }else{
                    res.status(403).json({
                        message: 'password yang anda masukan salah'
                    })
                }
            }else{
                res.status(403).json({
                    message: 'email yang anda masukan belum terdaftar'
                })
            }
            }).catch((err)=> {
            res.status(500).json({message: err.message || `Internal Server Erorr`})
            next()
        })
    }
}