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
       where  "user_id" = $1
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
      insert into  "users" ("miles_walked", "encounters")
           values  (0, 0)
        returning  "user_id", "miles_walked", "encounters", "created_at"
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
    return res.status(400).json({ error: 'miles_walked required' });
  }
  if (!encounters) {
    return res.status(400).json({ error: 'encounters required' });
  }
  if (!userId) {
    return res.status(400).json({ error: 'how did this happen sir. userId required, restart app' });
  }
  const sql = `
       update  "users"
          set  "miles_walked" = $2,
               "encounters" = $3
        where  "user_id" = $1
    returning  "user_id", "miles_walked", "encounters", "updated_at"
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
    select  "pb"."pokebox_id",
            "pb"."name",
            "p"."type",
            "p"."type_secondary",
            "p"."height",
            "p"."weight",
            "p"."sprite_front_default",
            "p"."sprite_back_default",
            "p"."sprite_front_shiny",
            "p"."sprite_back_shiny",
            "p"."flavor_text",
            "p"."flavor_text_new",
            "p"."growth_rate",
            "p"."species",
            "pb"."is_shiny",
            "pb"."created_at",
            "pb"."user_id"
      from  "pokeboxes" as "pb"
      join  "pokemon" as "p" using ("pokemon_id")
     where  "user_id" = $1
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
        where  "pokebox_id" = $2
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
    select  "backpack_id",
            "item_id",
            "quantity"
      from  "backpack_items"
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

// app.post('/api/pokemon', (req, res, next) => {
//   const id = req.body.id;
//   const name = req.body.name;
//   const type = req.body.type;
//   let type_secondary = null;
//   if (req.body.type_secondary) { type_secondary = req.body.type_secondary; }
//   const sprite_front_default = req.body.sprite_front_default;
//   const sprite_back_default = req.body.sprite_back_default;
//   const sprite_front_shiny = req.body.sprite_front_shiny;
//   const sprite_back_shiny = req.body.sprite_back_shiny;
//   const height = req.body.height;
//   const weight = req.body.weight;
//   const habitat = req.body.habitat;
//   const flavor_text = req.body.flavor_text;
//   const flavor_text_new = req.body.flavor_text_new;
//   const growth_rate = req.body.growth_rate;
//   const species = req.body.species;
//   const sql = `
//     insert into "pokemon" ("id", "name", "type", "type_secondary", "sprite_front_default", "sprite_back_default", "sprite_front_shiny", "sprite_back_shiny", "height", "weight", "habitat", "flavor_text", "flavor_text_new", "growth_rate", "species")
//     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
//     returning *
//   `;
//   const params = [id, name, type, type_secondary, sprite_front_default, sprite_back_default, sprite_front_shiny, sprite_back_shiny, height, weight, habitat, flavor_text, flavor_text_new, growth_rate, species];
//   db.query(sql, params)
//     .then(result => {
//       return res.status(201).json(result.rows[0]);
//     })
//     .catch(err => next(err));
// });

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
