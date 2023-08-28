import { Router } from "express";
import User from '../dao/models/user.js';
import is_form_ok from '../middlewares/is_form_ok.js';
import is_8_char from '../middlewares/is_8_char.js';
import is_valid_user from '../middlewares/is_valid_user.js';
import uploader from '../services/uploader.js';

const authRouter = Router();

authRouter.post('/register', is_form_ok, is_8_char, async (req, res, next) => {
    try {
        let user = await User.create(req.body)
        return res.status(201).json({
            success: true,
            massage: 'user registered',
            user_id: user._id
        })
    } catch (error) {
        next(error);
    }
})

authRouter.post('/login', is_8_char, is_valid_user, async (req, res, next) => {
    const email = req.body.mail
    try {
        req.session.mail = email
        let user = await User.findOne({mail: email})
        req.session.role = user.role
        return res.status(200).json({
            session: req.session,
            message: req.session.mail + " has started session",
            success: true
        })
    } catch (error) {
        next(error);
    }
})

authRouter.post('/signout', async (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: 'You have been signed out',
            dataSession: req.session
        })
    } catch (error) {
        next(error);
    }
})

export default authRouter