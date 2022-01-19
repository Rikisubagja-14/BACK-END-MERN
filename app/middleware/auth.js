const config = require('../../config')
const jwt = require('jsonwebtoken')
const Player = require('../player/model')


module.exports ={
    isLoginAdmin : async (req, res, next) =>{
        if(req.session.user == null || req.session.user === undefined){
            req.flash('alertMessage',`Silahkan login kembali`)
                req.flash('alertStatus','danger')
                res.redirect('/')
        }else{
            next()
        }
    },
    isLoginPlayer: async (req, res, next) =>{
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer',''): null;

        const data = jwt.verify(token, config.jwtkey)

        const player = await Player.find({_id : data.player.id})

        if(!player){
            throw new Error
        }

        req.player = player
        req.token = token


    } catch (err) {
        res.status(401).json({
            error: 'Not Authorized to access this resource'
        })
    }
    }
}