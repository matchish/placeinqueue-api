'use strict'

const dbConnection = require("../db/dbConnection");
const queries = require("../db/queries/queries");
const moment = require('moment')

module.exports = class QueueDao {
    async saveEntity(entity) {
        let con = await dbConnection();
        // TODO dry
        if (entity.places > process.env.MAX_PLACES) {
            throw new Error(`Max number of places is ${process.env.MAX_PLACES}`);
        }
        try {
            await con.query("START TRANSACTION");
            let savedQueue = await con.query(
                queries.insert_queue,
                [entity.title, moment(entity.datetime).format("YYYY-MM-DD HH:mm:ss"), entity.url, entity.places, entity.prestart]
            );
            entity.id = savedQueue.insertId;
            for (let i = 0; i < entity.places; i++) {
                await con.query(
                    queries.insert_place,
                    [entity.id]
                );
            }
            await con.query("COMMIT");
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
            // TODO dry
            if (entity.places > process.env.MAX_PLACES) {
                throw new Error(`Max number of places is ${process.env.MAX_PLACES}`);
            }
            await con.query("START TRANSACTION");
            await con.query(queries.update_queue, [
                entity.title,
                moment(entity.datetime).format("YYYY-MM-DD HH:mm:ss"),
                entity.url,
                entity.places,
                entity.prestart,
                entity.id
            ]);
            let res = await con.query(queries.count_place, [entity.id])
            res = JSON.parse(JSON.stringify(res))
            let amount = res.pop().amount
            if (entity.places > amount) {
                for (let i = 0; i < (entity.places - amount); i++) {
                    await con.query(
                        queries.insert_place,
                        [entity.id]
                    );
                }
            } else if (amount > entity.places) {
                await con.query(
                    queries.delete_place_limit,
                    [entity.id, (amount - entity.places)]
                );
            }
            await con.query("COMMIT");
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
        const mysql = require('mysql');

        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            const query = await con.query(queries.delete_queue, [id]);
            await con.query("COMMIT");
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async readEntities() {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let queues = await con.query(queries.read_queue);
            await con.query("COMMIT");
            queues = JSON.parse(JSON.stringify(queues));
            return queues;
        } catch (ex) {
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }
};