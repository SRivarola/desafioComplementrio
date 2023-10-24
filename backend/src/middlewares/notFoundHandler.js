<<<<<<< HEAD
import logger from '../config/logger/logger_dev.js';
=======
import logger from '../config/logger/logger.js';
>>>>>>> 38bf6af6af4540e942b79780e7df62b06d3b5282

const notFoundHandler = (req, res, next) => {
    req.logger = logger;
    req.logger.ERROR(
        `${req.method} ${req.url} - ${new Date().toLocaleTimeString()} - not found path.`
    );
    return res.status(404).json({
        method: req.method,
        path: req.url,
        message: "not found."
    })
}
export default notFoundHandler;