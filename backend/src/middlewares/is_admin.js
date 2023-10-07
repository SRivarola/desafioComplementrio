export default function (req, res, next){
    try {
        if (req.session.role === 1){
            next()
        } else {
            return res.status(403).json({
                status: 403,
                method: req.method,
                path: req.url,
                message: 'Forbidden.'
            })
        }
    } catch (error) {
        next(error)
    }
}