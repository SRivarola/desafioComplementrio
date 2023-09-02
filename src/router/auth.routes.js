import { Router } from "express";
import User from '../dao/models/user.js';
import is_form_ok from '../middlewares/is_form_ok.js';
import is_8_char from '../middlewares/is_8_char.js';
import passport from "passport";

const authRouter = Router();

authRouter.post('/register', is_form_ok, is_8_char, passport.authenticate("register"), async (req, res, next) => {
    try {
        return res.status(201).json({
            success: true,
            massage: 'user registered',
            user_id: req.user._id
        })
    } catch (error) {
        next(error);
    }
})

authRouter.post('/login', is_8_char, passport.authenticate("login"), async (req, res, next) => {
    try {
        req.session.mail = req.body.mail
        req.session.role = req.user.role
        return res.status(200).json({
            user: req.user,
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

authRouter.get('/check-session', (req, res, next) => {
    console.log(req.session)
    if(req.session.mail){
        return res.status(200).json({
            success: true
        })
    } else {
        return res.status(401).json({
            success: false
        })
    }
})

export default authRouter