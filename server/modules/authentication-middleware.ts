import { Request, Response, NextFunction } from 'express';

export const rejectUnauthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};
