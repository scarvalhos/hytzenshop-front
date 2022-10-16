"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const STORAGE_TYPE = process.env.STORAGE_TYPE;
const ClienteS3 = new s3_1.default({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const storageType = {
    development: multer_1.default.diskStorage({
        destination: (_req, file, callback) => {
            callback(null, path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (_req, file, callback) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    callback(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                callback(null, file.key);
            });
        },
    }),
    production: (0, multer_s3_1.default)({
        s3: ClienteS3,
        bucket: 'hytzenshop',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, callback) => crypto_1.default.randomBytes(16, (err, hash) => {
            if (err)
                callback(err);
            const fileName = `${hash.toString('hex')}-${file.originalname}`;
            callback(null, fileName);
        }),
    }),
};
exports.default = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageType[STORAGE_TYPE],
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new Error('Inválid file type.'));
        }
    },
};
//# sourceMappingURL=multer.js.map