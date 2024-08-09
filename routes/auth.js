const router = require("express").Router();
const user = require("../Modals/user");
const User = require("../Modals/user");
const bcrypt = require("bcryptjs")

//signup
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body; 
        const hashpassword = bcrypt.hashSync(password)
        const user = new User({ email, username, password: hashpassword });
        await user.save().then(() => res.status(200).json({"message":"signup successfull"}))
    } catch (error) { 
       res.status(200).json({ message : " User already exists"})
    }
})

//signin

router.post("/signin", async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user){ 
            res.status(200).json({ message : "Please Sign in First"})
        }
       const isPassword = bcrypt.compareSync(req.body.password, user.password)
       if(!isPassword){
        res.status(200).json({ message : "Password incorrect"})
    }
     const {password, ...others} = user._doc
     res.status(200).json({ others })
    } catch (error) {
        res.status(200).json({ message : " User already exists"})
     }
})
 
module.exports = router