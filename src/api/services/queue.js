const QueueDao = require("../../dao/queue_dao");
const PlaceDao = require("../../dao/place_dao");
const queueDao = new QueueDao();
const placeDao = new PlaceDao();

/**
 * @param {Object} options
 * @param {String} options.queueId The id of the queue to retrieve
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteQueue = async (options) => {

  await queueDao.deleteEntity(options.queueId)

  return {
    status: 204
  };
};

/**
 * @param {Object} options
 * @param {String} options.queueId The id of the queue to retrieve
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateQueue = async (options) => {

  await queueDao.updateEntity(options)
  return {
    status: 202
  };
};

/**
 * @param {Object} options
 * @param {String} options.queueId The id of the queue to retrieve places
 * @throws {Error}
 * @return {Promise}
 */
module.exports.listPlacesForQueue = async (options) => {

  const places = await placeDao.readEntitiesByQueueId(options.queueId)
  return {
    status: 200,
    data: places
  };
};

