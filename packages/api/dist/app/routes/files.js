'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const File_1 = require('../models/File')
const multer_1 = __importDefault(require('../../config/multer'))
const multer_2 = __importDefault(require('multer'))
const router = express_1.default.Router()
// GET ALL FILES
router.get('/', (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const files = yield File_1.File.find()
      return response.status(200).json(files)
    } catch (error) {
      return response.status(500).json(error)
    }
  })
)
// GET FILE
router.get('/:id', (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params
    try {
      const file = yield File_1.File.findById(id)
      return response.status(200).json({
        message: 'Arquivo encontrado com sucesso!',
        data: {
          file,
        },
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  })
)
// CREATE FILES
router.post(
  '/',
  (0, multer_2.default)(multer_1.default).single('file'),
  (request, response) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const {
          originalname: name,
          size,
          key,
          location: url = '',
        } = request.file
        const file = yield File_1.File.create({
          name,
          size,
          key,
          url,
        })
        return response.status(200).json(file)
      } catch (error) {
        console.log(error)
        return response.status(500).json(error)
      }
    })
)
// DELETE FILES
router.delete('/:id', (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const file = yield File_1.File.findById(request.params.id)
      yield file === null || file === void 0 ? void 0 : file.remove()
      return response.send()
    } catch (error) {
      return response.status(500).json(error)
    }
  })
)
exports.default = router
//# sourceMappingURL=files.js.map
