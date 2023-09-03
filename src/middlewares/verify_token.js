import User from "../dao/models/user.js";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
    const auth = req.session.token;
    if(!auth) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        })
    }
    const token = auth;
    jwt.verify(token, `${process.env.SECRET_KEY}`, async (error, credentials) => {
        console.log(credentials)
        try {
            let user = await User.findOne({ mail: credentials.mail })
            req.user = user;
            return next()
        } catch (error) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials"
            });
        }
    })
}