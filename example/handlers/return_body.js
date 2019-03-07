const express = require('express')

module.exports.post = []

module.exports.post.push(express.urlencoded())
module.exports.post.push(function(req,res)
{
    res.json(req.body)
})