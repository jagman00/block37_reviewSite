const router = require("express").Router();
const jwt = require('jsonwebtoken');


const prisma = require("../prisma");


// //auth me middleware
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    console.log('token: ',token);
    
    if (!token) {
        return res.status(401).send({message: 'token not set'})
    }
    try {
        const {id, username} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUniqueOrThrow({
            where: {id}
        })
        req.user = user;
        // res.send({message: `hello ${username}`})
        next();
    } catch (error) {
       res.status(401).send({message: 'invalid or expired token'})
    }
  
}

//register new user
router.post('/resiger', async (req, res, next) => {
    //const 
    try {
        
    } catch (error) {
        next(error)
    }
    
})

module.exports = {router, verifyToken};