const Bank = require('./model')

module.exports = {
    index: async (req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert ={message: alertMessage, status:alertStatus}
            const bank = await Bank.find()
            res.render('admin/bank/view_bank',{
                bank,
                alert,
                name : req.session.user.name,
                title : 'Halaman Bank'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },
    viewCreate: async(req, res)=>{
    try {
        res.render('./admin/bank/create',{
            name : req.session.user.name,
            title : 'Halaman Tambah Bank'
        })
    } catch (err) {
        req.flash('alertMessage',`${err.message}`)
        req.flash('alertStatus','danger')
        res.redirect('/bank')
        console.log(err)
    }
    },
    actionCreate : async (req, res) =>{
        try {
            const {name,nameBank,noRekening} = req.body

            let bank = await Bank({
                name,
                nameBank,
                noRekening
            });
            console.log(bank);
            await bank.save();

            req.flash('alertMessage',"Behasil Menambahkan Bank")
            req.flash('alertStatus',"success")

            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },
    viewEdit : async (req, res)=>{
        try {
            const {id} = req.params
            const bank = await Bank.findOne({_id : id})
            res.render('admin/bank/edit',{
                bank,
                name : req.session.user.name,
                title : 'Halaman Edit'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },

    actionEdit: async (req, res) =>{
        try {
            const {id} = req.params;
            const {name,nameBank,noRekening} = req.body
             await Bank.findOneAndUpdate({_id : id},{
                name,
                nameBank,
                noRekening
            });
            req.flash('alertMessage',"Behasil Mengubah Bank")
            req.flash('alertStatus',"success")

            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },
    actionDelete: async (req, res) =>{
        try {
            const {id} = req.params;
            const bank = await Bank.findOneAndRemove({_id : id});
            req.flash('alertMessage',"Behasil Menghapus bank")
            req.flash('alertStatus',"success")
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    }
}