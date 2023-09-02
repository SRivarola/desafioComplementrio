import passport from 'passport';
import { Strategy } from "passport-local";
import GhStrategy from "passport-github2";
import User from "../dao/models/user.js"

export default function () {
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    })
    
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback: true, usernameField: 'mail' },
            async (req, username, password, done) => {
                try {
                    let one = await User.findOne({ mail: username });
                    if(!one){
                        let user = await User.create(req.body);
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )
    passport.use(
        'login',
        new Strategy(
            { usernameField: "mail" },
            async (username, password, done) => {
                try {
                    let one = await User.findOne({ mail: username });
                    if(!one) {
                        return done(null);
                    } else {
                        return done(null, one);
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}