const express = require('express');
const queues = require('../services/queues');

const router = new express.Router();

/**
 * List all queues
 */
router.get('/', async (req, res, next) => {
    try {
        const result = await queues.listQueues();
        res.status(result.status || 200).send(result.data);
    } catch (err) {
        res.status(500).send({
            code: 500,
            message: err.message
        });
    }

});

/**
 * Create a queue
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await queues.createQueue(req.body);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    res.status(500).send({
      code: 500,
      message: err.message
    });
  }
});

module.exports = router;
