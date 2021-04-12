import mysql from 'mysql2/promise';

import {connectionSettings} from '../settings';

export default async () => {
    const conn = await mysql.createConnection(connectionSettings);
    try {
        await conn.execute(`
            SELECT *
            FROM weather
        `);
    }   catch (error) {
        // If table does not exist, create it
        if (error.errno === 1146) {
            console.log('Initializing table: weather');
            await conn.execute(`
                CREATE TABLE weather (
                id serial primary key,
                device_id varchar(100),
                date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data json
                )
            `);
            console.log('...success!');
        }
    }
};