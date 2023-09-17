import { Router} from 'express'
import jwt from 'jsonwebtoken'
import User from '../dao/models/user.js'

export default class MyRouter {
    constructor() {
        this.router = Router();
        this.init();
    }
    getRouter() {
        return this.router
    }
    init() {}
    applyCbs(cbs) {
        return cbs.map((cb) => async (...params) => {
            try {
                await cb.apply(this, params);
            } catch (error) {
                params[1].status(500).send(error);
            }
        })
    }
    responses = (req, res, next) => {
        res.sendSuccessCreate = (payload) => res.status(201).json(payload)
        res.sendSuccess = (payload) => res.status(200).json(payload)
        res.sendNotFound = () => res.status(404).json({ success: false, response: 'Not found' })
        res.sendNotAuthenticatedError = (error) => res.status(401).json({ status: 'error', error })
        res.sendNotAuthorizatedError = (error) => res.status(403).json({ status: 'error', error })

        return next()
    }
    handlePolicies = (policies) => async (req, res, next) => {
        if (policies.includes('USER')) {
            return next()
        } else {
            const authHeaders = req.headers.authorization
            if(!authHeaders) {
                return res.sendNotAuthenticatedError('Unauthenticated')
            } else {
                const tokenArray = authHeaders.split(' ')
                const token = tokenArray[1]
                const payload = jwt.verify(token, process.env.SECRET_KEY)
                const user = await User.findOne(
                    { mail: payload.mail },
                    'mail role'
                )
                const role = user.role;
                if (
                    (policies.includes("USER") && role === 0) ||
                    (policies.includes("ADMIN") && role === 1)
                ) {
                    req.user = user
                    return next()
                } else {
                    return res.sendNotAuthorizatedError('Unauthorized')
                }
            }
        }
    }
    //create
    post(path, policies, ...cbs) {
        this.router.post(
            path,
            this.responses,
            this.handlePolicies(policies),
            this.applyCbs(cbs)
        )
    }
    //read
    read(path, policies, ...cbs) {
        this.router.get(
            path,
            this.responses,
            this.handlePolicies(policies),
            this.applyCbs(cbs)
        )
    }
    //update
    put(path, policies, ...cbs) {
        this.router.put(
            path,
            this.responses,
            this.handlePolicies(policies),
            this.applyCbs(cbs)
        )
    }
    //delete
    delete(path, policies, ...cbs) {
        this.router.delete(
            path,
            this.responses,
            this.handlePolicies(policies),
            this.applyCbs(cbs)
        )
    }
}