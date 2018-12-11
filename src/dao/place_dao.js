'use strict'

const dbConnection = require("../db/dbConnection");
const queries = require("../db/queries/queries");
const moment = require('moment')

module.exports = class PlaceDao {
    async saveEntity(entity) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let savedQueue = await con.query(
                queries.insert_place,
                [entity.used, entity.number, entity.url, entity.proxy, entity.useragent, entity.cookies]
            );
            await con.query("COMMIT");
            entity.id = savedQueue.insertId;
            return entity;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async updateEntity(entity) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(queries.update_place, [
                entity.used,
                entity.number,
                entity.remote_id,
                entity.url,
                entity.proxy,
                entity.useragent,
                entity.cookies,
                entity.heartbeat_at ? moment(entity.heartbeat_at).format("YYYY-MM-DD HH:mm:ss") : null,
                entity.id
            ]);
            await con.query("COMMIT");
            return true;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async deleteEntity(id) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(queries.delete_queue, [id]);
            await con.query("COMMIT");
            return true;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async readEntitiesByQueueId(id) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let places = await con.query(queries.read_place_by_queue_id, [id]);
            await con.query("COMMIT");
            places = JSON.parse(JSON.stringify(places));
            return places;
        } catch (ex) {
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

};