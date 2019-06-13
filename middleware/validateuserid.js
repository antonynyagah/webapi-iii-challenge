const db = require('../users/userDb')

validateuserid = async (req, res, next) => {
    try {
        const user = await db.getById(req.params.id)
        user
        ?   (req.user = user, next())
        :   res.status(404).json({message: 'Invalid user id!'})
    }
    catch (err) {
        res.status(500).json({message: 'Error: Server conflict processing your request!'})
    }
}

module.exports = validateuserid