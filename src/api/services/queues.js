const QueueDao = require("../../dao/queue_dao");
const queueDao = new QueueDao();

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.listQueues = async () => {

    let queues = await queueDao.readEntities()
    return {
        status: 200,
        data: queues
    };

};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createQueue = async (options) => {

    let entity = await queueDao.saveEntity(options)
    return {
      status: 200,
      data: entity
    };
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteQueue = async (id) => {

    await queueDao.deleteEntity(id)

    return {
      status: 200
    };
};

