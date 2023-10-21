import args from "../arguments.js";
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
