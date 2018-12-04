const dbConnection = require("../dbConnection");

;(async () => {
    let con = await dbConnection();

    try {
        await con.query("START TRANSACTION");
        await con.query(
            'CREATE TABLE IF NOT EXISTS `default`.`queue` ( ' +
            '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , ' +
            '`title` VARCHAR(255) NOT NULL , `url` TEXT NOT NULL , ' +
            '`datetime` DATETIME NOT NULL , ' +
            '`prestart` INT UNSIGNED NOT NULL , ' +
            '`places` INT UNSIGNED NOT NULL , ' +
            'PRIMARY KEY (`id`), ' +
            'UNIQUE KEY (`title`)) ENGINE = InnoDB;',
            []
        );
        await con.query(
            'CREATE TABLE IF NOT EXISTS `default`.`place` ' +
            '( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , ' +
            '`used` BOOLEAN NOT NULL DEFAULT FALSE , ' +
            '`url` TEXT NULL , ' +
            '`remote_id` TEXT NULL , ' +
            '`proxy` JSON NOT NULL DEFAULT \'{}\' , ' +
            '`useragent` TEXT NULL , ' +
            '`cookies` JSON NOT NULL DEFAULT \'{}\' , ' +
            '`number` INT UNSIGNED NULL , ' +
            'queue_id INT UNSIGNED NOT NULL, ' +
            '`heartbeat_at` DATETIME NULL , ' +
            'PRIMARY KEY (`id`), ' +
            'INDEX (`used`, `queue_id`), ' +
            'FOREIGN KEY (queue_id) REFERENCES queue(id) ON DELETE CASCADE) ENGINE = InnoDB;',
            []
        );
        await con.query("COMMIT");
    } catch (ex) {
        await con.query("ROLLBACK");
        console.log(ex);
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }
})()