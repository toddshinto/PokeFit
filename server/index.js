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
  if (!userId) {
    return res.status(400).json({ error: 'valid userId not found' });
  }
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
      return res.status(200).send(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/users', (req, res, next) => {
  const milesWalked = req.body.milesWalked;
  const encounters = req.body.encounters;
  let sql;
  let userId;
  let params;
  if (req.session.userId) {
    userId = req.session.userId;
    sql = `
    insert into "users" ("userId", "milesWalked", "encounters")
    values ($1, $2, $3)
    on conflict ("userId") do update set
    "milesWalked" = $2, "encounters" = $3
    returning "userId", "milesWalked", "encounters", "updatedAt"
  `;
    params = [userId, milesWalked, encounters];
  } else {
    sql = `
    insert into "users" ("milesWalked", "encounters")
    values ($1, $2)
    returning "userId", "milesWalked", "encounters", "updatedAt"
  `;
    params = [milesWalked, encounters];
  }
  if (!milesWalked) {
    return res.status(400).json({ error: 'milesWalked required' });
  }
  if (!encounters) {
    return res.status(400).json({ error: 'encounters required' });
  }
  db.query(sql, params)
    .then(result => {
      if (!req.session.userId) {
        req.session.userId = result.rows[0].userId;
      }
      if (req.body.rememberMe) {
        const oneWeek = 7 * 24 * 3600 * 1000;
        req.session.cookie.expires = new Date(Date.now() + oneWeek);
        req.session.cookie.maxAge = oneWeek;
      }
      return res.status(201).json(result.rows[0]);
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
