const Payment = require('./model')
const Bank = require('../bank/model')
module.exports = {
    index: async (req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert ={message: alertMessage, status:alertStatus}
            const payment = await Payment.find().populate('banks')
            res.render('admin/payment/view_payment',{
                payment,
                alert,
                name : req.session.user.name,
                title : 'Halaman Payment'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
        }
    },
    viewCreate: async(req, res)=>{
    try {
        const banks = await Bank.find()
        res.render('./admin/payment/create',{
            banks,
            name : req.session.user.name,
                title : 'Halaman Tambah Payment'
        })
    } catch (err) {
        req.flash('alertMessage',`${err.message}`)
        req.flash('alertStatus','danger')
        res.redirect('/payment')
        console.log(err)
    }
    },
    actionCreate : async (req, res) =>{
        try {
            const {banks,type} = req.body

            let payment = await Payment({
                banks,
                type
                
            });
            console.log(payment);
            await payment.save();

            req.flash('alertMessage',"Behasil Menambahkan payment")
            req.flash('alertStatus',"success")

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/paymenawait payment')
            console.log(err)
        }
    },
    viewEdit : async (req, res)=>{
        try {
            const {id} = req.params
            const payment = await Payment.findOne({_id : id}).populate('banks')
            const banks = await Bank.find()
            res.render('admin/payment/edit',{
                payment,
                banks,
                name : req.session.user.name,
                title : 'Halaman Edit Payment'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
        }
    },

    actionEdit: async (req, res) =>{
        try {
            const {id} = req.params;
            const {banks,type} = req.body
            await Payment.findOneAndUpdate({_id : id},{banks,type});
            req.flash('alertMessage',"Behasil Mengubah Payment")
            req.flash('alertStatus',"success")

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
        }
    },
    actionDelete: async (req, res) =>{
        try {
            const {id} = req.params;
             await Payment.findOneAndRemove({_id : id});
            req.flash('alertMessage',"Behasil Menghapus Payment")
            req.flash('alertStatus',"success")
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
        }
    }
}