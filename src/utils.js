import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname+'/client/src/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const uploader = multer({storage})
export default __dirname;

