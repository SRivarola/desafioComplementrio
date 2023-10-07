import AuthRepository from "../repositories/auth.rep.js"

export default async function (req, res, next) {
    try {
        const { mail } = req.body;
        const User = new AuthRepository();
        let one = await User.readOne(mail)
        if(one) {
            req.user = one;
            return next();
        } else {
            return res.status(400).json({
                method: req.method,
                path: req.url,
                message: "invalid credentials",
                response: null,
            });
        }
    } catch (error) {
        return next(error);
    }
}