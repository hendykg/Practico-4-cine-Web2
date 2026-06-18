const fs = require("fs");
const path = require("path");
const multer = require("multer");

const ensureDirectory = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

const uploadsRoot = path.join(__dirname, "..", "uploads");
const postersPath = path.join(uploadsRoot, "posters");

ensureDirectory(postersPath);

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        if (file.fieldname === "poster_image") {
            return cb(null, postersPath);
        }
        return cb(new Error("Unsupported file field"));
    },
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname || "").toLowerCase();
        const safeExtension = extension || ".jpg";
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`);
    }
});

const imageFileFilter = (_req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
};

const uploader = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadMoviePoster = uploader.single("poster_image");

module.exports = {
    uploadMoviePoster
};