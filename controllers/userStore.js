const User = require('../models/User')
module.exports= async (req,res)=>{    
    try {        
           const user = await User.create({
                name: req.body.txtName,
                email: req.body.txtEmail,
                userName: req.body.txtUserName,
                password: req.body.txtPassword
            }) 
            
            console.log('User Added !! >> Info :: >>'+user)
           return res.redirect('/')
    } catch (error) {
        console.log('Error: Data Creation ' || error)
        return res.redirect('/register')
    }
}