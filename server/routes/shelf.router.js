const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed'

  if (!req.user){
    res.sendStatus(401)
    return;
  }
  let queryText = `
    SELECT * FROM "item"
    JOIN "user"
      ON "user"."id" = "item"."user_id"
  `;
  pool.query(queryText)
    .then((result) => {
      console.log('result is', result);
      
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user is', req.user);
  
  // endpoint functionality
  const queryText = `
    INSERT INTO "item"
      ("description", "image_url", "user_id")
    VALUES
      ($1, $2, $3)
  `;
  pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
    .then((results) => {
      res.sendStatus(201) // Created response froms server
    }).catch((error) => {
      console.log('error is', error);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {

  if (req.user.id !== req.body.user_id) {
    res.sendStatus(401)
    return;
  }
  const queryText = `
    DELETE FROM "item"
   `;
  pool.query(queryText)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('DELETE /item failed', err);
      res.sendStatus(500);
    });
  })

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
