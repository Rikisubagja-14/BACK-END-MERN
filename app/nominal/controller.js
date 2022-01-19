const Nominal = require('./model')

module.exports = {
    index: async (req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert ={message: alertMessage, status:alertStatus}
            const nominal = await Nominal.find()
            res.render('admin/nominal/view_nominal',{
                nominal,
                alert,
                name : req.session.user.name,
                title : 'Halaman Nominal'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/nominal')
            console.log(err)
        }
    },
    viewCreate: async(req, res)=>{
    try {
        res.render('./admin/nominal/create',{
            name : req.session.user.name,
                title : 'Halaman Tambah Nominal'
        })
    } catch (err) {
        req.flash('alertMessage',`${err.message}`)
        req.flash('alertStatus','danger')
        res.redirect('/nominal')
        console.log(err)
    }
    },
    actionCreate : async (req, res) =>{
        try {
            const {coinName,coinQuantity,price} = req.body

            let nominal = await Nominal({
                coinName,
                coinQuantity,
                price
            });
            console.log(nominal);
            await nominal.save();

            req.flash('alertMessage',"Behasil Menambahkan Nominal")
            req.flash('alertStatus',"success")

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/nominal')
            console.log(err)
        }
    },
    viewEdit : async (req, res)=>{
        try {
            const {id} = req.params
            const nominal = await Nominal.findOne({_id : id})
            res.render('admin/nominal/edit',{
                nominal,
                name : req.session.user.name,
                title : 'Halaman Edit Nominal'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/nominal')
            console.log(err)
        }
    },

    actionEdit: async (req, res) =>{
        try {
            const {id} = req.params;
            const {coinName,coinQuantity,price} = req.body
            const nominal = await Nominal.findOneAndUpdate({_id : id},{coinName,coinQuantity,price});
            req.flash('alertMessage',"Behasil Mengubah Nominal")
            req.flash('alertStatus',"success")

            res.redirect('nominal')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/nominal')
            console.log(err)
        }
    },
    actionDelete: async (req, res) =>{
        try {
            const {id} = req.params;
            const nominal = await Nominal.findOneAndRemove({_id : id});
            req.flash('alertMessage',"Behasil Menghapus Nominal")
            req.flash('alertStatus',"success")
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/nominal')
            console.log(err)
        }
    }
}