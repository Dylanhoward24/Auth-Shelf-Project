import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as encryptLib from '../modules/encryption';
import pool from '../modules/pool';

passport.serializeUser((user: any, done: any): void => {
  done(null, user.id);
});

passport.deserializeUser((id: string | number, done: any): void => {
  pool
    .query('SELECT * FROM "user" WHERE id = $1', [id])
    .then((result: any): void => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];

      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        done(null, user);
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    })
    .catch((error: string): void => {
      console.log('Error with query during deserializing user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
});

// Does actual work of logging in
passport.use(
  'local',
  new LocalStrategy(
    (username: string, password: string, done: Function): void => {
      pool
        .query('SELECT * FROM "user" WHERE username = $1', [username])
        .then((result: any): void => {
          const user = result && result.rows && result.rows[0];
          if (user && encryptLib.comparePassword(password, user.password)) {
            // All good! Passwords match!
            // done takes an error (null in this case) and a user
            done(null, user);
          } else {
            // Not good! Username and password do not match.
            // done takes an error (null in this case) and a user (also null in this case)
            // this will result in the server returning a 401 status code
            done(null, null);
          }
        })
        .catch((error: any): void => {
          console.log('Error with query for user ', error);
          // done takes an error (we have one) and a user (null in this case)
          // this will result in the server returning a 500 status code
          done(error, null);
        });
    }
  )
);

export default passport;
