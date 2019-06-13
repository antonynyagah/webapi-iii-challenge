const express = require('express')
const router = express.Router()
const db_users = require('./userDb')
const db_posts = require('../posts/postDb')

const middlewares = require('../middleware')

//CREATE
router.post('/', middlewares.validateuser, async (req, res) => {
    try {
        const user = await db_users.insert(req.body)
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json({message: `Error!`})
    }
})


router.post('/:id/posts', middlewares.validatepost, middlewares.validateuserid, async (req, res) => {
    try {
        let post = {...req.body, user_id: req.params.id}
        post = await db_posts.insert(post)
        res.status(201).json(post)
    }
    catch (err) {
        res.status(500).json({message: `Error: cannot POST`})
    }
})

//GET
router.get('/', async (req, res) => {
    try {
        const users = await db_users.get()
        users.length > 0
        ?   res.status(200).json(users)
        :   res.status(400).json({message: `No users found!`})
    }
    catch (err) {
        res.status(500).json({error: `Error: Server conflict looking for users!`})
    }
})

router.get('/:id', middlewares.validateuserid, async (req, res) => {
    try {
        const user = await db_users.getById(req.params.id)
        user
        ?   res.status(200).json(user)
        :   res.status(404).json({message: `No users found!`})
    }
    catch (err) {
        res.status(500).json({error: `Error: Server conflict looking for users!`})
    }
})

router.get('/:id/posts', middlewares.validateuserid, async (req, res) => {
    try {
        const posts = await db_users.getUserPosts(req.params.id)
        posts.length > 0
        ?   res.status(200).json(posts)
        :   res.status(200).json({message: `Invalid post!`})
    }
    catch (err) {
        res.status(500).json({error: `Error: Server conflict reading user posts!`})
    }
})

//UPDATE
router.put('/:id', middlewares.validateuser, middlewares.validateuserid, async (req, res) => {
    try {
        await db_users.update(req.params.id, req.body)
        ?   res.status(200).json({id: req.params.id, ...req.body})
        :   res.status(404).json({message: `No users found!`})
    }
    catch (err) {
        res.status(500).json({error: `Error: Server conflict upadating user!`})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        await db_users.remove(req.params.id)
        ?   res.status(200).json({message: `User deleted!`})
        :   res.status(404).json({message: `No User present to delete!`})
    }
    catch (err) {
        res.status(500).json({error: `Error: server conflict deleting user!`})
    }
})

module.exports = router