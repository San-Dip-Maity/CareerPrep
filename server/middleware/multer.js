import multer from "multer";

const storage =  multer.memoryStorage();
export const singleUpload = multer({ storage }).single('file');
const upload = multer({ storage: multer.memoryStorage() });
export default upload