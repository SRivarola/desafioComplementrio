import passport from 'passport';
import { Strategy } from "passport-local";
import GhStrategy from "passport-github2";
import User from "../dao/models/user.js";
import jwt from 'passport-jwt';

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
    passport.use(
        'current',
        new jwt.Strategy(
            {
                jwtFromRequest: jwt.ExtractJwt.fromExtractors([
                    (req) => req?.cookies["token"],
                ]),
                secretOrKey: process.env.SECRET_KEY,
            },
            async (payload, done) => {
                try {
                    let user = await User.findOne({ mail: payload.mail });
                    if(user) {
                        done(null, user)
                    } else {
                        done(null)
                    }
                } catch (error) {
                    done(error)
                }
            }
        )
    )
    passport.use(
        'github',
        new GhStrategy(
            {
                clientID: process.env.GH_CLIENT_ID,
                clientSecret: process.env.GH_CLIENT_SECRET,
                callbackURL: process.env.GH_CB
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({ mail: profile._json.login })
                    if(user){
                        return done(null, user)
                    } else {
                        let one = await User.create({
                            name: profile.username,
                            photo: profile._json.avatar_url,
                            mail: profile._json.login,
                            password: profile._json.profileUrl
                        })
                        return done(null, one)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}