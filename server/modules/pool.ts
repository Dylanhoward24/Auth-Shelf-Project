/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

import pg from 'pg';
import url, { UrlWithStringQuery } from 'url';

let config: object = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL) as any;
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  // "localhost" is Docker's default
  const host = process.env.POSTGRES_HOST
    ? process.env.POSTGRES_HOST
    : 'localhost';
  // "postgres" is the default username for Docker
  const user = process.env.POSTGRES_USER
    ? process.env.POSTGRES_USER
    : 'postgres';
  // "postgres" is the default password for Docker
  const password = process.env.POSTGRES_PASSWORD
    ? process.env.POSTGRES_PASSWORD
    : 'postgres';
  // setting up PORT 5432 as default DB PORT
  const port = process.env.PORT_DB ? process.env.PORT_DB : 5432;
  const database = process.env.POSTGRES_DB
    ? process.env.POSTGRES_DB
    : 'prime_boilerplate';

  config = {
    host, // Server hosting the postgres database
    user,
    password,
    port,
    database, // name of application database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

// this creates the pool that will be shared by all other modules
const pool: pg.Pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err): void => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
