const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const QueueDao = require("../dao/queue_dao");
const PlaceDao = require("../dao/place_dao");
const queueDao = new QueueDao();
const placeDao = new PlaceDao();
const moment = require("moment")

async function upBrowsers() {
    try {
        let queues = await queueDao.readEntities()
        queues.forEach(async (queue) => {
            if (moment().isBetween(moment(queue.datetime).subtract(queue.prestart, 'minutes'), moment(queue.datetime).add(process.env.BROWSER_SHUTDOWN_WAIT, 'minutes'))) {
                let places = await placeDao.readEntitiesByQueueId(queue.id)
                places.forEach((place) => {
                    //TODO magic constant
                    if (!place.url && (!place.heartbeat_at || moment(place.heartbeat_at).isBefore(moment().subtract(1, 'minutes')))) {
                        var params = {
                            DelaySeconds: 0,
                            MessageBody: JSON.stringify({
                                id: place.id,
                                queue_id: queue.id,
                                url: queue.url,
                                cookies: place.cookies,
                                callback: `${process.env.API_URL}/place/${place.id}`
                            }),
                            QueueUrl: process.env.AWS_SQS_URL
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

setInterval(upBrowsers, 15000)


