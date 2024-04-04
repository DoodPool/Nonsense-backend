import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        // console.log('CRITERIA', criteria)
        const collection = await dbService.getCollection('stay')
        const stays = await collection.find(criteria).toArray()
        // console.log('stays',stays);
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

export const stayService = {
    query,
    getById,
}

function _buildCriteria(filterBy) {
    // console.log(filterBy);
    const { country, labels, type,roomType, bedrooms, bathrooms, minPrice, maxPrice, } = filterBy
// console.log(typeof country);
    let criteria = {}

    if (country) {
        // criteria['loc.city'] = {$regex: country}
        criteria = {
            $or: [
              { 'loc.city': { $regex: country } },
              { 'loc.country': { $regex: country } }
            ]
          };
    }

    if (type) {
        criteria.type = { $regex: type, $options: 'i' }
    }

    if (roomType) {
        criteria.roomType = { $regex: roomType, $options: 'i' }
    }

    if (labels) {
        criteria.labels = { $regex: labels, $options: 'i' }
    }

    if (bedrooms) {
        criteria.bedrooms = bedrooms
    }

    if (bathrooms) {
        criteria.bathrooms = bathrooms
    }

    if (minPrice && maxPrice) {
        criteria.price = { $gte: minPrice, $lte: maxPrice }
    }
    return criteria
}