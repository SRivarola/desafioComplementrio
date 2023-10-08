import MyRouter from "../router.js";
import AuthController from "../../controllers/users.controller.js"

import passport from "passport";
import { Router } from "express";
import is_user from "../../middlewares/is_user.js";
import is_form_ok from '../../middlewares/is_form_ok.js';
import is_8_char from '../../middlewares/is_8_char.js';
import create_token from '../../middlewares/create_token.js';
import is_valid_pass from "../../middlewares/is_valid_pass.js";
import is_valid_user from "../../middlewares/is_valid_user.js";

const controller = new AuthController();

export default class AuthRouter extends MyRouter {
    init() {
        this.post(
            '/register', 
            ["USER"], 
            is_8_char,
            is_form_ok,
            is_valid_user,
            async (req, res, next) => {
                try {
                    return res.status(201).json({
                        success: true,
                        massage: 'user registered'
                    })
                } catch (error) {
                    next(error);
                }
            }
        )

        this.post(
            '/login', 
            ["USER", "ADMIN"],
            is_user,
            is_valid_pass, 
            create_token, 
            async (req, res, next) => {
                try {
                    req.session.mail = req.body.mail
                    req.session.role = req.user.role
                    return res.status(200).cookie('token', req.session.token, { maxAge: 60*60*24*7*1000, httpOnly: true }).json({
                        success: true,
                        user: req.user,
                        message: req.session.mail + " has started session",
                        token: req.session.token
                    })
                } catch (error) {
                    next(error);
                }
            }
        )

        this.post(
            '/signout', 
            ["USER", "ADMIN"], 
            async (req, res, next) => {
                try {
                    req.session.destroy()
                    return res.status(200).clearCookie('token').json({
                        success: true,
                        message: 'You have been signed out',
                        dataSession: req.session
                    })
                } catch (error) {
                    next(error);
                }
        })

        this.read('/current', ["USER", "ADMIN"], passport.authenticate('current'), async (req, res, next) => {
            try {
                return res.status(200).json({
                    success: true,
                    user: req.user
                })
            } catch (error) {
                next(error);
            }
        })

        this.read('/check-session', ["USER", "ADMIN"], (req, res, next) => {
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

    }
}


export const authRouter = Router();

authRouter.get('/github', passport.authenticate('github', { scope: ['user:mail']}), (req, res) => {})
authRouter.get('/github/callback', passport.authenticate('github', {}), (req, res, next) =>{
    try {
        req.session.mail = req.user.mail;
        req.session.role = req.user.role;
        return res.status(200).redirect('http://localhost:5173/products')
    } catch (error) {
        next(error)
    }
})