module.exports = {
    insert_queue: `INSERT INTO queue(title, datetime, url, places, prestart) VALUES(?, ?, ?, ?, ?)`,
    read_queue: `SELECT * FROM queue`,
    update_queue: `UPDATE queue SET queue.title = ?, queue.datetime = ?, queue.url = ?, queue.places = ?, queue.prestart = ? WHERE queue.id = ?`,
    delete_queue: `DELETE FROM queue WHERE queue.id = ?`,
    insert_place: `INSERT INTO place(queue_id) VALUES(?)`,
    read_place_by_queue_id: `SELECT * FROM place WHERE place.queue_id = ?`,
    update_place: `UPDATE place SET place.used = ?, place.number = ?, place.url = ?, place.proxy = ?, place.useragent = ?, place.cookies = ? WHERE place.id = ?`,
    place_register_heartbeat: `UPDATE place SET place.heartbeat_at = ? WHERE place.id = ?`,
    delete_place: `DELETE FROM place WHERE place.id = ?`,
    count_place: `SELECT count(id) as amount FROM place WHERE place.queue_id = ?`,
    //TODO rename
    delete_place_limit: `DELETE FROM place WHERE place.queue_id = ? ORDER BY (number IS NULL) DESC, number DESC LIMIT ?`
}