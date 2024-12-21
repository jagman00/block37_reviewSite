const router = require("express").Router();
module.exports = router;
const {verifyToken} = require('./auth')
const prisma = require("../prisma");

//get all comments
router.get('/', async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany()
        res.json(comments)
    } catch (error) {
        next()
    }
})

//get comments by user
router.get('/me', verifyToken, async (req, res, next) => {
    const {id} = req.user
    try {
        const getComments = await prisma.user.findUnique({
            where: {id: +id},
            select: {comment: true},
        })
        res.status(201).json(getComments)
    } catch (error) {
        next(error)
    }
})