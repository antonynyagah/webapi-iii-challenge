validatePost = (req, res, next) => {
    req.body && Object.keys(req.body).length
    ?   req.body.text !== ''
        ?   next()
        :   res.status(400).json({message: 'Missing required text field!'})
    :   res.status(400).json({message: 'Missing post data!'})
}

module.exports = validatePost