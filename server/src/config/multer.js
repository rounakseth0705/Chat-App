import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 50*1024*1024 },
    fileFilter: (req,file,cb) => {
        if (file.mimetype.startsWith("image/")) {
            cd(null, true);
        } else {
            cb(new Error("Only images files are allowed"), false);
        }
    }
});

export default upload;