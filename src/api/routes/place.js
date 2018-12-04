const express = require('express');
const place = require('../services/place');

const router = new express.Router();

/**
 * Update place
 */
router.post('/:placeId', async (req, res, next) => {
    const options = {
        ...req.body, id: parseInt(req.params.placeId)
    };
    try {
        let result = await place.updatePlace(options);
        return res.status(result.status).send();
    } catch (err) {
        return res.status(500).send({
            code: 500,
            error: err.message
        });
    }
});

module.exports = router;
