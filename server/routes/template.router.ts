import express, { Request, Response } from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get('/', (req: Request, res: Response): void => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req: Request, res: Response): void => {
  // POST route code here
});

export default router;
