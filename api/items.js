const router = require("express").Router();

const prisma = require("../prisma");
const { verifyToken } = require("./auth");

//get all items
router.get('/', async (req, res, next) => {
    try {
        const items = await prisma.item.findMany({
            // select: {itemName: true, reviews: true},
        })
        res.json(items)
    } catch (error) {
        next()
    }
})

//get item based on id
router.get('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id
        const item = await prisma.item.findMany({where: {id}})
        res.json(item)
    } catch (error) {
        next()
    }
})

//get reviews based on item based on id
router.get('/:itemId/reviews', verifyToken, async (req, res, next) => {
    try {
        const {itemId} = req.params
        const review = await prisma.review.findMany({where: {item_id: +itemId}})
        res.json(review)
    } catch (error) {
        next()
    }
})

//get a review based on id from item based on id
router.get('/:item_id/reviews/:review_id', async (req, res, next) => {
    const {item_id, review_id} = +req.params
    try {
        const review = await prisma.review.findFirst({
            where: {item_id, review_id}})
            res.json(review)
    } catch (error) {
        next()
    }
})

//post review from item id ------ SECURE WITH MIDDLEWARE
router.post('/:item_id/reviews', async (req, res, next) => {
    const {item_id} = req.params
    const {user_id, body, title, rating} = req.body
    try {
        const addReview = await prisma.review.create({
            data: {item_id: +item_id, user_id: +user_id, rating: +rating, title, body}
        })
        res.json(addReview)
    } catch (error) {
        next()
    }
    
})

//add comments to reviews based on item and review id
router.post('/:item_id/reviews/:reviews_id/comments', async (req, res, next) => {
    const {reviews_id} = req.params
    const {user_id, title, body} = req.body    
    try {
        const addComment = await prisma.comment.create({
            data: {review_id: +reviews_id, user_id: +user_id, title, body}
        })
        res.json(addComment)
    } catch (error) {
        next()
    } 
})

module.exports = router;