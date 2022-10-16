"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFile = void 0;
const File_1 = require("../app/models/File");
const searchFile = (id) => {
    return typeof id === 'string'
        ? File_1.File.findById(id)
        : Promise.all(id.map((el) => File_1.File.findById(el)));
};
exports.searchFile = searchFile;
//# sourceMappingURL=files.js.map