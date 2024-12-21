const router = require("express").Router();
module.exports = router;
const {verifyToken} = require('./auth')
const prisma = require("../prisma");

//get review from id
router.get('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id
        const review = await prisma.review.findMany({where: {id}})
        res.json(review)
    } catch (error) {
        next()
    }
})

//get logged in user's reviews
router.get('/me', verifyToken, async (req, res, next) => {
    const {id} = req.user
    try {
        const getReviews = await prisma.user.findUnique({
            where: {id: +id},
            select: {reviews: true},
        })
        res.status(201).json(getReviews)
    } catch (error) {
        next(error)
    }
})

//get all reviews
router.get('/', async (req, res, next) => {
    try {
        const review = await prisma.review.findMany()
        res.json(review)
    } catch (error) {
        next()
    }
})