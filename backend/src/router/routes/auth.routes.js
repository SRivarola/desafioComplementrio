import MyRouter from "../router.js";
import AuthController from "../../controllers/users.controller.js"
import { sendPasswordResetEmail } from "./helper.js";
//import PasswordReset from "../../dao/mongo/models/PasswordReset.js";
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
            ["PUBLIC"], 
            is_8_char,
            is_form_ok,
            is_valid_user,
            async (req, res, next) => {
                try {
                    let response = await controller.register(req.body)
                    return response ? res.sendSuccessCreate(response) : res.sendNotFound('user');
                } catch (error) {
                    next(error)
                }
            }
        )

        this.post(
            '/login', 
            ["PUBLIC"],
            is_user,
            is_valid_pass, 
            create_token, 
            async (req, res, next) => {
                try {
                    req.session.mail = req.body.mail
                    req.session.role = req.user.role
                    let response = await controller.login()
                    return response
                      ? res
                          .cookie("token", req.session.token, {
                            maxAge: 60 * 60 * 24 * 7 * 1000,
                            httpOnly: true,
                          })
                          .sendSuccess({
                            response,
                            user: { mail: req.session.mail, role: req.user.role },
                          })
                      : res.sendNotFound("user");
                } catch (error) {
                    next(error)
                }
            }
        )

        this.post(
            '/signout', 
            ["USER", "ADMIN", "PREMIUM"], 
            async (req, res, next) => {
                try {
                    req.session.destroy()
                    let response = await controller.signout();
                    return response ? res.clearCookie('token').sendSuccess(response) : res.clearCookie('token').sendNotFound('user');
                } catch (error) {
                    next(error);
                }
        })

        this.post(
            '/forgot-password',
            ["USER", "ADMIN", "PREMIUM"],
            async (req, res, next) => {
                try {
                    const { email } = req.body;
                    const user = await controller.readOne(email);

                    if(user){
                        await sendPasswordResetEmail(email, user._id);

                        return res.status(200).json({
                            message: 'Correo electrónico enviado para restablecimiendo de contraseña'
                        });
                    } else {
                        return res.status(404).json({
                            message: 'User not found.'
                        })
                    }
                } catch (error) {
                    next(error)
                }
            }
        )

            this.read(
              "/forgot-password",
              ["USER", "ADMIN", "PREMIUM"],
              async (req, res, next) => {
                try {

                  const { token } = req.query;

                  const user = await controller.findOne({
                    resetToken: token,
                    resetTokenExpiresAt: { $gt: new Date() },
                  });

                  if (!user) {
                    return res
                      .status(400)
                      .json({ message: "Token inválido o expirado" });
                  }

                  return res.status(200).json({ message: "Token válido" });
                } catch (error) {
                  next(error);
                }
              }
            );
        this.read(
            "/current",
            ["PUBLIC"],
            passport.authenticate("current"),
            async (req, res, next) => {
                console.log(req.user)
                let { mail, role, photo, first_name, last_name, _id } = req.user;
                try {
                    return res.status(200).json({
                      success: true,
                      user: { mail, role, photo, first_name, last_name, _id },
                    });
                } catch (error) {
                    next(error);
                }
            }
        );

        // this.read(
        //     "/check-session",
        //     ["USER", "ADMIN"],
        //     (req, res, next) => {
        //     if (req.session.mail) {
        //         return res.status(200).json({
        //         success: true,
        //         });
        //     } else {
        //         return res.status(401).json({
        //         success: false,
        //         });
        //     }
        //     }
        // );

        this.put(
            '/premium/:uid', 
            ["USER"],
            async (req, res, next) => {
                const { uid } = req.params; 
                try {
                    const response = await controller.update(uid, { role: "PREMIUM"})
                    const result = response.response
                    const { first_name, last_name, role, mail, _id, photo } = result;

                    return response
                      ? res.sendSuccess({
                          first_name,
                          last_name,
                          role,
                          mail,
                          _id,
                          photo
                        })
                      : res.sendNotFound();
                } catch (error) {
                    next(error)
                    
                }    
            }
        );
        this.put(
            '/admin/:uid', 
            ["PREMIUM", "ADMIN"],
            async (req, res, next) => {
                const { uid } = req.params; 
                try {
                    const response = await controller.update(uid, { role: "ADMIN"})
                    const result = response.response
                    const { first_name, last_name, role, mail, _id, photo } = result;

                    return response
                      ? res.sendSuccess({
                          first_name,
                          last_name,
                          role,
                          mail,
                          _id,
                          photo
                        })
                      : res.sendNotFound();
                } catch (error) {
                    next(error)
                    
                }    
            }
        );

        /* this.put(
            '/',
            ["USER", "PREMIUM"],
            async (req, res, next) => {
                
            }
        ) */
        

        this.delete(
            '/:uid',
            ["ADMIN"],
            async (req, res, next) => {
                try {
                    let { uid } = req.params;
                    let user = await controller.delete(uid);
                    return user ? res.sendSuccess(user) : res.sendNotFound('user');
                } catch (error) {
                    next(error)
                }
            })
    }
}


export const authRouter = Router();

    authRouter.post('/github', passport.authenticate('github', { scope: ['user:mail']}), (req, res) => {})
    authRouter.post('/github/callback', passport.authenticate('github', {}), (req, res, next) =>{
        try {
            req.session.mail = req.user.mail;
            req.session.role = req.user.role;
            return res.status(200).redirect('http://localhost:5173/products')
        } catch (error) {
            next(error)
        }
})
