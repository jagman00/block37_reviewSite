const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

//get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        next()
    }
})

//update a user's review based on user and review id
router.put('/:user_id/reviews/:review_id', async (req, res, next) => {
    const {review_id} = req.params
    const {body, title, rating} = req.body
    try {
        const updateReview = await prisma.review.update({
            where: {id: +review_id}, 
            data: {body, title, rating: +rating},
        })
        res.json(updateReview)
    } catch (error) {
        next()
    }  
})

//update a user's comment based on user and comment id
router.put('/:user_id/comments/:comment_id', async (req, res, next) => {
    const {comment_id, user_id} = req.params
    const {title, body} = req.body
    const userCheck = await prisma.comment.findUnique({where:
        {user_id: +user_id, id: +comment_id}
    })
    //console.log(userCheck);
    if (userCheck) {
        try {
            const updateComment = await prisma.comment.update({
                where: {id: +comment_id}, 
                data: {title, body},
            })
            res.json(updateComment)
        } catch (error) {
            next()
        }    
    } else {
        next()
    }
})

//delete comment based on user and comment id
router.delete('/:user_id/comments/:comment_id', async (req, res, next) => {
    const {comment_id, user_id} = req.params
    const userCheck = await prisma.comment.findUnique({where:
        {user_id: +user_id, id: +comment_id}
    })
    if (userCheck) {
        try {
           await prisma.comment.delete({where:
                {id: +comment_id}
            });
           return res.status(201).json({message:'comment deleted'})
        } catch (error) {
            console.error(error)
            return res.status(500)
        }     
    } else{
        next()
    }
})

//delete review based on user and review id
router.delete('/:user_id/reviews/:review_id', async (req, res, next) => {
    const {review_id, user_id} = req.params
    const userCheck = await prisma.review.findUnique({where:
        {user_id: +user_id, id: +review_id}
    })
    if (userCheck) {
        try {
           await prisma.review.delete({where:
                {id: +review_id}
            });
           return res.status(201).json({message:'review deleted'})
        } catch (error) {
            console.error(error)
            return res.status(500)
        }     
    } else{
        next()
    }
})