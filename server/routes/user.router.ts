import express, { Request, Response } from 'express';
import { rejectUnauthenticated } from '../modules/authentication-middleware';
import * as encryptLib from '../modules/encryption';
import pool from '../modules/pool';
import userStrategy from '../strategies/user.strategy';

const router: express.Router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req: Request, res: Response): void => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post(
  '/register',
  (req: Request, res: Response, next: express.NextFunction): void => {
    const username: string | null = <string>req.body.username;
    const password: string | null = encryptLib.encryptPassword(
      req.body.password
    );

    const queryText: string = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
    pool
      .query(queryText, [username, password])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
  }
);

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post(
  '/login',
  userStrategy.authenticate('local'),
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);

// clear all server session information about this user
router.post('/logout', (req: Request, res: Response): void => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

export default router;
