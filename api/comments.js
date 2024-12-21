const router = require("express").Router();
module.exports = router;

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