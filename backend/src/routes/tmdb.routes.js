import express from 'express'
import { tmdbProxy } from '../controllers/tmdb.controller.js'

const router = express.Router()

router.get('/*', tmdbProxy)

export default router