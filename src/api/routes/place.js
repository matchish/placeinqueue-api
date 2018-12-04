const express = require('express');
const place = require('../services/place');

const router = new express.Router();

/**
 * Update place
 */
router.post('/:placeId', async (req, res, next) => {
    const options = {
        ...req.body, id: req.params.placeId
    };

    try {
        const result = await place.updatePlace(options);
        res.status(result.status || 200).send(result.data);
    } catch (err) {
        return res.status(500).send({
            code: 500,
            error: err.message
        });
    }
});

module.exports = router;
