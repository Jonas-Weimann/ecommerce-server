import multer from "multer";
import fs from "fs";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

const config = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({storage: config});

export const leerJSON = (path)=>{
    try{
        const data = fs.readFileSync(path, "utf-8")
        return JSON.parse(data)
    } catch (error){
        console.log(error.message)
        return []
    }
}

export const actualizarJSON = (path, updatedData)=>{
    try{
        fs.writeFileSync(path, JSON.stringify(updatedData))
    } catch (error){
        console.log(error.message)
        return []
    }
}
