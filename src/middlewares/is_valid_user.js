import User from "../dao/models/user.js";

export default async function (req, res, next){
    try {
        let { mail, password } = req.body;
        let user =  await User.findOne({ mail })
        if (user && user.password === password){
            next()
        } else {
            return res.status(400).json({
                status: 400,
                method: req.method,
                path: req.url,
                message: 'Invalid Credentials.'
            })
        }  
    } catch (error) {
        next(error)
    }
}