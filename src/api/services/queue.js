const dao = require('placeinqueue-dao');
const QueueDao = dao.QueueDao;
const PlaceDao = dao.PlaceDao;
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

  const queue = await queueDao.readEntity(options.queueId)
  const places = await placeDao.readEntitiesByQueue(queue)
  return {
    status: 200,
    data: places
  };
};

