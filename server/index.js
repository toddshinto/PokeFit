require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/users', (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    const sql = `
      select  *
        from  "users"
       where  "userId" = $1
  `;
    const params = [userId];
    db.query(sql, params)
      .then(result => {
        if (result.rows.length < 1) {
          return next(new ClientError(`cannot ${req.method} ${req.originalUrl}, user does not found`));
        }
        return res.status(200).json(result.rows[0]);
      })
      .catch(err => next(err));
  } else {
    const newUser = `
      insert into  "users" ("milesWalked", "encounters")
           values  (0, 0)
        returning  "userId", "milesWalked", "encounters", "createdAt"
    `;
    db.query(newUser)
      .then(result => {
        req.session.userId = result.rows[0].userId;
        return res.status(201).json(result.rows[0]);
      })
      .catch(err => next(err));
  }
});

app.put('/api/users', (req, res, next) => {
  const milesWalked = req.body.milesWalked;
  const encounters = req.body.encounters;
  const userId = req.session.userId;
  if (!milesWalked) {
    return res.status(400).json({ error: 'milesWalked required' });
  }
  if (!encounters) {
    return res.status(400).json({ error: 'encounters required' });
  }
  if (!userId) {
    return res.status(400).json({ error: 'how did this happen sir. userId required, restart app' });
  }
  const sql = `
       update  "users"
          set  "milesWalked" = $2,
               "encounters" = $3
        where  "userId" = $1
    returning  "userId", "milesWalked", "encounters", "updatedAt"
  `;
  const params = [userId, milesWalked, encounters];
  db.query(sql, params)
    .then(result => {
      if (!req.session.userId) {
        req.session.userId = result.rows[0].userId;
      }
      req.session.cookie.expires = new Date(Date.now() + 315360000000);
      req.session.cookie.maxAge = 315360000000;
      return res.status(200).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.get('/api/pokeboxes', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  const sql = `
    select  "pokemonId",
            "pokeboxId",
            "name",
            "createdAt"
      from  "pokeboxes"
     where  "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      return res.status(201).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.put('/api/pokeboxes', (req, res, next) => {
  const userId = req.session.userId;
  const pokeboxId = req.body.pokeboxId;
  const newName = req.body.newName;
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  if (!pokeboxId) {
    return res.status(400).json({ error: 'pokeboxId required' });
  }
  if (!newName) {
    return res.status(400).json({ error: 'new name required. what is the point of this without one' });
  }
  const sql = `
       update  "pokeboxes"
          set  "name" = $1
        where  "pokeboxId" = $2
    returning  "name"
  `;
  const params = [newName, pokeboxId];
  db.query(sql, params)
    .then(result => {
      return res.status(200).json(result.rows[0]);
    });
});

app.get('/api/backpack-items', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  const sql = `
    select  "backpackId",
            "itemId",
            "quantity"
      from  "backpackItems"
     where  "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      return res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
