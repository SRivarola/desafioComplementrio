import args from "../arguments.js";
<<<<<<< HEAD
import logger_dev from "./logger_dev.js";
import loggers_prod from "./loggers_prod.js";

let logger = null;

switch(args.mode) {
    case "prod":
        logger = loggers_prod;
        break;
    default: //dev
        logger = logger_dev;
        break;
}
export default logger;
=======
import logger from "./logger.js";

let modeLogger = null;

switch(args.mode) {
    case "prod":
        modeLogger = logger.transports = [
            new transports.File({
                level: "ERROR",
                format: simple(),
                filename: "./src/logs/errors.log"
            })
        ]
        break;
    default: //dev
        modeLogger = logger.transports = [
            new transports.Console({ level: "HTTP", format: simple() })
        ]
        break;
}
export default modeLogger;
>>>>>>> 38bf6af6af4540e942b79780e7df62b06d3b5282
