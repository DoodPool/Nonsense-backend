import { stayService } from './stay.service.js'
import { logger } from '../../services/logger.service.js'

export async function getStays(req, res) {
    try {
        // console.log('req query',req.query);
        logger.debug('Getting Stays:', req.query)
        const filterBy = {
            country: req.query.country || '',
            labels: req.query.labels || '',
            type:req.query.type || '',
            roomType:req.query.roomType || '',
            minPrice: +req.query.minPrice || '',
            maxPrice: +req.query.maxPrice || '',
            bedrooms: +req.query.bedrooms || '',
            bathrooms: +req.query.bathrooms || '',
        }
        const stays = await stayService.query(filterBy)
        res.json(stays)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(400).send({ err: 'Failed to get stays' })
    }
}

export async function getStayById(req, res) {
    try {
        const stayId = req.params.id
        const stay = await stayService.getById(stayId)
        // console.log('stay',stay);
        res.json(stay)
    } catch (err) {
        logger.error('Failed to get stay', err)
        res.status(400).send({ err: 'Failed to get stay' })
    }
}

// export async function addStay(req, res) {
//     const { loggedinUser } = req

//     try {
//         const stay = req.body
//         stay.owner = loggedinUser
//         const addedStay = await stayService.add(stay)
//         socketService.broadcast({ type: 'stay-added', data: addedStay, userId: loggedinUser._id })
//         res.json(addedStay)
//     } catch (err) {
//         logger.error('Failed to add stay', err)
//         res.status(400).send({ err: 'Failed to add stay' })
//     }
// }


// export async function updateStay(req, res) {
//     try {
//         const stay = req.body
//         const updatedStay = await stayService.update(stay)
//         res.json(updatedStay)
//     } catch (err) {
//         logger.error('Failed to update stay', err)
//         res.status(400).send({ err: 'Failed to update stay' })

//     }
// }

// export async function removeStay(req, res) {
//     const { loggedinUser } = req
//     try {
//         const stayId = req.params.id
//         const removedId = await stayService.remove(stayId)
//         socketService.broadcast({ type: 'stay-removed', data: stayId, userId: loggedinUser._id })
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove stay', err)
//         res.status(400).send({ err: 'Failed to remove stay' })
//     }
// }

// export async function addStayMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const stayId = req.params.id
//         const msg = {
//             txt: req.body.txt,
//             by: loggedinUser
//         }
//         const savedMsg = await stayService.addStayMsg(stayId, msg)
//         res.json(savedMsg)
//     } catch (err) {
//         logger.error('Failed to update stay', err)
//         res.status(400).send({ err: 'Failed to update stay' })

//     }
// }

// export async function removeStayMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const stayId = req.params.id
//         const { msgId } = req.params

//         const removedId = await stayService.removeStayMsg(stayId, msgId)
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove stay msg', err)
//         res.status(400).send({ err: 'Failed to remove stay msg' })

//     }
// }


