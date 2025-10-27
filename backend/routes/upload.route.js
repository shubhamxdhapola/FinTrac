import express from 'express'
import multer from 'multer'
import FinTracStorage from '../config/cloudinary.js'
import { uploadImage } from '../controllers/upload.controller.js'

const router = express.Router()
const upload = multer({storage : FinTracStorage})

router.post('/', upload.single('file'), uploadImage)

export default router