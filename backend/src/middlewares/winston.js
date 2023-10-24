<<<<<<< HEAD
import logger from '../config/logger/factory.js';
=======
import logger from '../config/logger/logger.js';
>>>>>>> 38bf6af6af4540e942b79780e7df62b06d3b5282

export default (req, res, next) => {
    req.logger = logger;
    req.logger.HTTP(
        `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
    );
    return next();
}