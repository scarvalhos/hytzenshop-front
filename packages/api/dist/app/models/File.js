"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const s3 = new aws_sdk_1.default.S3();
const FileSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    key: {
        type: String,
    },
    url: {
        type: String,
    },
}, { timestamps: true });
FileSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});
FileSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE === 'production') {
        s3.deleteObject({
            Bucket: 'hytzenshop',
            Key: this.key,
        }).promise();
        return;
    }
    else {
        return (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key));
    }
});
exports.File = (0, mongoose_1.model)('File', FileSchema);
//# sourceMappingURL=File.js.map