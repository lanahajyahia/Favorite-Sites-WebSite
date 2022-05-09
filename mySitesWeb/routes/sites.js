const express = require('express')
const router = express.Router()
const Site = require('../models/site')

// get all sites
router.get('/', async(req, res) => {
    // res.send('Hello world')

    try {
        // await for all to come 
        const sites = await Site.find()
        res.json(sites)
    } catch (err) {
        // 500 means theirs an error on the server
        // which mean the db cause the actions not to work
        res.status(500).json({ message: err.message })
    }
})

// get one
router.get('/:id', getSite, (req, res) => {
    // req.params.id
    res.json(res.site)
})

// create one
router.post('/', async(req, res) => {
    const site = new Site({
        cityName: req.body.cityName,
        siteName: req.body.siteName,
        desc: req.body.desc,
        images: req.body.images
    })

    try {
        const newSite = await site.save()
            // 201 - successfully created an object
        res.status(201).json(newSite)
    } catch (err) {
        // this will fail if the user doesn't pass the name or whatever
        // if the user gives a bad data - something wrong with the user input 
        res.status(400).json({ message: err.message })
    }
})

// delete one
router.delete('/:id', getSite, async(req, res) => {
    try {
        await res.site.remove()
        res.json({ message: 'DELETED' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSite(req, res, next) {
    let site
    try {
        site = await Site.findById(req.params.id)
        if (site == null) {
            return res.status(404).json({ message: 'Site not found' })

        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.site = site
    next()
}
module.exports = router