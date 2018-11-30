const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const QueueDao = require("./dao/queue_dao");
const PlaceDao = require("./dao/place_dao");
const queueDao = new QueueDao();
const placeDao = new PlaceDao();
const moment = require("moment")

// setInterval(() => {
// }, 60000)
//
async function upBrowsers() {
    try {
        let queues = await queueDao.readEntities()
        queues.forEach(async (queue) => {
            if (moment().isBetween(moment().subtract(queue.prestart, 'minutes'), moment(queue.datetime))) {
                let places = await placeDao.readEntitiesByQueueId(queue.id)
                places.forEach((place) => {
                    //TODO magic constant
                    if (!place.heartbeat_at || moment(place.heartbeat_at).isBefore(moment().subtract(1, 'minutes'))) {
                        var params = {
                            DelaySeconds: 0,
                            MessageBody: JSON.stringify({
                                id: place.id,
                                queue_id: queue.id,
                                url: queue.url,
                                heartbeat_url: `${process.env.API_URL}/place/${place.id}/heartbeat`
                            }),
                            QueueUrl: "https://sqs.us-east-1.amazonaws.com/231818033401/placeinqueue"
                        };

                        sqs.sendMessage(params, function (err, data) {
                            if (err) {
                                console.log("Error", err);
                            } else {
                                console.log("Success", data.MessageId);
                            }
                        });
                    }
                })
            }
        })
    } catch (e) {
        console.log(e.message)
    }
}

upBrowsers()