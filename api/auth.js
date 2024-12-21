const router = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = require("../prisma");


// //auth me middleware
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    //console.log('token: ',token);
    
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

const createToken = (id, username, isAdmin=false) => {
    return jwt.sign({id, username, isAdmin: isAdmin}, process.env.JWT_SECRET)
}

//register new user
router.post('/register', async (req, res, next) => {
    const {username, password} = req.body
    const hashPass = await bcrypt.hash(password, 5)
    try {
        const newUser = await prisma.user.create({
            data: {username, password: hashPass},
        })
        const token = createToken(newUser.id, newUser.username);
        res.json(token)
    } catch (error) {
        next(error)
    } 
})

//login user
router.post('/login', async (req, res, next) => {
    const {username, password, isAdmin} = req.body
    try {
        const user = await prisma.user.findMany({
            where: {username},
        })
        console.log(user);
        
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (isMatch){
            const token = createToken(user[0].id, user[0].username, isAdmin)
            res.status(201).json(token)
        } else{
        res.status(401).json({message: 'could not log in'})
        }
    } catch (error) {
        next(error)
    }
})

router.get('/me', verifyToken, async (req, res, next) => {
    const {id, username} = req.user
    res.status(201).json({message: `welcome ${username}`, id})
})

module.exports = {router, verifyToken};