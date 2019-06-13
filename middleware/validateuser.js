validateuser = (req, res, next) => {
    req.body && Object.keys(req.body).length
    ?   req.body.name !== ''
        ?   next()
        :   res.status(400).json({message: 'missing required name field!'})
    :   res.status(400).json({message: 'user data is missing!'})
}

module.exports = validateuser