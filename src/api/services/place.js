const dao = require('placeinqueue-dao');
const PlaceDao = dao.PlaceDao;
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

