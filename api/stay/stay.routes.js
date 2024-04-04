import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getStays, getStayById } from './stay.controller.js'

const router = express.Router()

router.get('/', log, getStays)
router.get('/:id', getStayById)

export const stayRoutes = router
