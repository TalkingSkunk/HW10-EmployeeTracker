require('dotenv').config();
// module to connect to database
const db = require( './connection' )('cms_db', process.env.PASSWORD)

const orm = {

    async select(column, tableName, condition='') {
        const sql = `SELECT ${column} FROM ${tableName}`+ (condition ? ` ${condition}` : '');
        const table = await db.query(sql);
        return table;
    },

    async insert(tableName, column, values) {
        const sql = `INSERT INTO ${tableName} (${column}) VALUES (${values})`;
        await db.query(sql);
    },

    async update(tableName, changeColumn, condition) {
        const query = `UPDATE ${tableName} SET ${changeColumn} WHERE ${condition}`;
        await db.query(query);
    },

    async delete(tableName, condition) {
        const query = `DELETE FROM ${tableName} WHERE ${condition}`;
        await db.query(query);
    },

    async closeORM(){
        return db.close()
    }
};

module.exports = orm;