const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

//get all reviews
router.get('/', async (req, res, next) => {
    try {
        const review = await prisma.review.findMany()
        res.json(review)
    } catch (error) {
        next()
    }
})

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


