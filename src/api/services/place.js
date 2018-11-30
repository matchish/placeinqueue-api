const PlaceDao = require("../../dao/place_dao");
const placeDao = new PlaceDao()

/**
 * @param {Object} options
 * @param {String} options.placeId The id of the place
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePlace = async (options) => {
  await placeDao.updateEntity(options)

  return {
    status: 202,
  };
};

/**
 * @param {Object} options
 * @param {String} options.placeId The id of the place
 * @throws {Error}
 * @return {Promise}
 */
module.exports.registerHeartBeat = async (options) => {
  await placeDao.registerHeartBeat(options.id, options.datetime)

  return {
    status: 202,
  };
};

