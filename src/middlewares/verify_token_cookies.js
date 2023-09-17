import User from "../dao/models/user.js";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const auth = req.cookies;
    if(!auth.token) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
    const token = auth.token
    jwt.verify(token, process.env.SECRET_KEY, async (error, credentials) => {
        try {
            let user = await User.findOne({ mail: credentials.mail });
            req.user = user;
            return next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }
    })
}