import "babel-polyfill";
import Koa from "koa";
import Router from "koa-router";
import mysql from "mysql2/promise";
import KoaBody from 'koa-bodyparser';

import { connectionSettings } from './settings';
import { databaseReady } from './helpers';
import { initDB } from './fixtures';

// Käynnistettäessä, (eli kerran) ajettava funktio, databaseReady tarkistaa onko tietokanta valmis 
// initDB tarkistaa onko haluttua taulukkoa(table) olemassa ja jos ei, luo sen 
(async () => {
  await databaseReady();
  await initDB();
})();

const pool = mysql.createPool(connectionSettings);

// The port that this server will run on, defaults to 9000
const port = process.env.PORT || 9000;

// Instantiate a Koa server
// Luodaan "Koa-app", voisi sanoa tässä yhteydessä http-serveriksi
// Luotu Koa-appis on se äly, joka hoitaa liikennöinnin kun tehdään http-kutsuja serverille.
const app = new Koa();

// koa-bodyparser jäsentää(?)  HTTP-pyynnön sisällön/datan? (in english koa-bodyparser parses the request body)
// anyway, data kulkee oikeassa muodossa
const koaBody = new KoaBody();

// Instantiate routers
// Tehdään koa-router nimeltä "test". Router reitittää eri kutsut eri reikiin. (Esim. polut /api/v1/test/ ja eri metodit GET/POST/...)
const test = new Router();

// Define API path
const apiPath = "/api/v1";






// Lisätään test-routerille reitti http GET-kutsulle polkuun <serveri:portti>/api/v1/data/
// (.get == määritellään GET-kutsulle reitti)
// huom. pitää olla async, koska tehdään tietokantaan operaatio
test.get(`${apiPath}/data`, async (ctx) => {
  try {
    const [data] = await pool.execute(`
        SELECT *
        FROM weather
      `);

    console.log("Data fetched:", data);

    // Tell the HTTP response that it contains JSON data encoded in UTF-8
    ctx.type = "application/json; charset=utf-8";

    // Add stuff to response body
    ctx.body = data;
  } catch (error) {
    console.error("Error occurred:", error);
    ctx.throw(500, error);
  }
});

test.post(`${apiPath}/data`, koaBody, async (ctx) => {
  const { device_id, data } = ctx.request.body;

  console.log(`device_id: ${device_id}`);
  console.log("data: ", data);
  //console.log("ctx.request.body = ", ctx.request.body)
  
  try {
    const [status] = await pool.execute(`
          INSERT INTO weather (device_id, data)
          VALUES (:device_id, :data);
        `, { device_id, data });

    ctx.status = 200;
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  } 
});





// Rekisteröidään koa-appikselle koa-routeriin (nimeltä "test") määritellyt reitit middlewarena
// eli tämän jälkeen koa-app osaa vastata tuohon GETiin polussa /api/v1/data/
app.use(test.routes());

// rekisteröidään myös koa-routerin tarjoama valmis middleware, joka vastaa OPTIONS-kutsuun sen mukaan, mitä routeriin on konfiguroitu
// eli jos on rekattu yksi get-route, niin jos tehdään OPTIONS-kysely, niin serveri osaa vastata määriteltyyn reittiin, että GET ja HEAD ovat tuettuja
// jos olisi routattu samaan osoitteeseen myös vaikka POST-kutsullekin toteutus, niin tulisi GET, HEAD, POST - ja niin eespäin
app.use(test.allowedMethods());

// Start the server and keep listening on port until stopped
app.listen(port);

console.log(`App listening on port ${port}`);





