const express = require('express');
const queue = require('../services/queue');

const router = new express.Router();

/**
 * Info for a specific queue
 */
router.get('/:queueId', async (req, res, next) => {
  const options = {
    queueId: req.params.queueId
  };

  try {
    const result = await queue.showQueueById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      code: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Update queue
 */
router.post('/:queueId', async (req, res, next) => {
  const options = {
      ...req.body, id: req.params.queueId
  };
  try {
    const result = await queue.updateQueue(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      code: 500,
      error: err.message
    });
  }
});

/**
 * Delete queue
 */
router.delete('/:queueId', async (req, res, next) => {
  const options = {
    queueId: req.params.queueId
  };

  try {
    const result = await queue.deleteQueue(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      code: 500,
      error: 'Server Error'
    });
  }
});

/**
 * List all places of queue
 */
router.get('/:queueId/places', async (req, res, next) => {
  const options = {
    queueId: req.params.queueId
  };

  try {
    const result = await queue.listPlacesForQueue(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      code: 500,
      error: err.message
    });
  }
});

module.exports = router;
