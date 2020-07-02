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
  const newUser = `
             insert into  "users" ("miles_walked", "encounters", "time_walked")
                 values   (0, 0, 0)
               returning  "user_id" as "userId",
                          "miles_walked" as "milesWalked",
                          "encounters",
                          "time_walked" as "timeWalked",
                          "created_at" as "createdAt"
            `;
  if (userId) {
    const sql = `
      select  "user_id" as "userId",
              "miles_walked" as "milesWalked",
              "encounters",
              "time_walked" as "timeWalked",
              "created_at" as "createdAt"
        from  "users"
       where  "user_id" = $1
  `;
    const params = [userId];
    db.query(sql, params)
      .then(result => {
        if (result.rows.length < 1) {
          db.query(newUser)
            .then(result => {
              if (result.rows.length > 0) {
                req.session.userId = result.rows[0].userId;
                return result;
              }
            })
            .catch(err => next(err));
        }
        return res.status(202).json(result.rows[0]);
      })
      .catch(err => next(err));
  } else {
    db.query(newUser)
      .then(result => {
        req.session.userId = result.rows[0].userId;
        return res.status(200).json(result.rows[0]);
      })
      .catch(err => next(err));
  }
});

app.put('/api/users', (req, res, next) => {
  const milesWalked = req.body.milesWalked;
  const encounters = req.body.encounters;
  const userId = req.session.userId;
  const timeWalked = req.body.timeWalked;
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
               "encounters" = $3,
               "time_walked" = $4
        where  "user_id" = $1
    returning  "user_id" as "userId",
               "miles_walked" as "milesWalked",
               "time_walked" as "timeWalked",
               "encounters",
               "updated_at" as "updatedAt"
  `;
  const params = [userId, milesWalked, encounters, timeWalked];
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
  // if (!userId) {
  //   return res.status(400).json({ error: 'userId required' });
  // }
  const sql = `
    select  "pb"."pokebox_id" as "pokeboxId",
            "pb"."name",
            "p"."type",
            "p"."type_secondary" as "typeSecondary",
            "p"."height",
            "p"."habitat",
            "p"."weight",
            "p"."sprite_front_default" as "spriteFrontDefault",
            "p"."sprite_back_default" as "spriteBackDefault",
            "p"."sprite_front_shiny" as "spriteFrontShiny",
            "p"."sprite_back_shiny" as "spriteBackShiny",
            "p"."flavor_text" as "flavorText",
            "p"."flavor_text_new" as "flavorTextNew",
            "p"."growth_rate" as "growthRate",
            "p"."species",
            "pb"."is_shiny" as "isShiny",
            "pb"."created_at" as "createdAt",
            "pb"."user_id" as "userId"
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

app.get('/api/pokemon/:pokemonId', (req, res, next) => {
  const pokemonId = req.params.pokemonId;
  if (!pokemonId) {
    return res.status(400).json({ error: 'invalid pokemonId' });
  }
  const sql = `
       select "name",
              "type",
              "type_secondary" as "typeSecondary",
              "height",
              "habitat",
              "weight",
              "capture_rate" as "captureRate",
              "sprite_front_default" as "spriteFrontDefault",
              "sprite_back_default" as "spriteBackDefault",
              "sprite_front_shiny" as "spriteFrontShiny",
              "sprite_back_shiny" as "spriteBackShiny",
              "flavor_text" as "flavorText",
              "flavor_text_new" as "flavorTextNew",
              "growth_rate" as "growthRate",
              "species",
              "pokemon_id" as "pokemonId"
        from  "pokemon"
       where  "pokemon_id" = $1
  `;
  const params = [pokemonId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length > 0) {
        return res.status(200).json(result.rows[0]);
      } else {
        return res.status(500).json({ error: 'unexpected errrrr' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.get('/api/items/:itemId', (req, res, next) => {
  const itemId = req.params.itemId;
  if (!itemId) {
    return res.status(400).json({ error: 'invalid itemId' });
  }
  const sql = `
     select  *
       from  items
      where  item_id = $1
  `;
  const params = [itemId];
  db.query(sql, params)
    .then(result => {
      return res.status(200).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred. Item not found' });
    });
});

app.delete('/api/pokeboxes', (req, res, next) => {
  const pokeboxId = req.body.pokeboxId;
  const sql = `
    delete from pokeboxes
    where pokebox_id = $1
  `;
  const params = [pokeboxId];
  db.query(sql, params)
    .then(result => {
      return res.status(200).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.put('/api/pokeboxes', (req, res, next) => {
  const pokeboxId = req.body.pokeboxId;
  const newName = req.body.name;
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
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.put('/api/backpack-items', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  const quantity = req.body.quantity;
  const itemId = req.body.item_id;
  const sql = `
    insert into backpack_items (user_id, item_id, quantity)
    values ($1, $2, $3)
    on conflict (user_id, item_id) do update
    set quantity=backpack_items.quantity + $3
    returning *
  `;
  const params = [userId, itemId, quantity];
  db.query(sql, params)
    .then(result => {
      return res.status(200).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.put('/api/backpack-items/use', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  const itemId = req.body.item_id;
  const sql = `
    update  backpack_items
       set  quantity = quantity - 1
     where  user_id = $1
       and  item_id = $2
       and  quantity > 0
  `;
  const params = [userId, itemId];
  db.query(sql, params)
    .then(result => {
      return res.status(200).json({ succes: 'item use success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occured, SIR.' });
    });
});

app.get('/api/backpack-items', (req, res, next) => {
  const userId = req.session.userId;
  // if (!userId) {
  //   return res.status(400).json({ error: 'userId required' });
  // }
  const sql = `
    select  "i"."item_short_desc" as "shortDesc",
            "i"."item_long_desc" as "longDesc",
            "quantity",
            "i"."name",
            "i"."sprite",
            "i"."item_type" as "type",
            "i"."item_id",
            "i"."effect"
      from  "backpack_items" as "bi"
      join "items" as "i" using (item_id)
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

app.post('/api/pokeboxes', (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: 'userId required ' });
  }
  const pokemonId = req.body.pokemonId;
  const name = req.body.name;
  const sql = `
  insert into pokeboxes (pokemon_id, user_id, name)
  values ($1, $2, $3)
  returning *
  `;
  const params = [pokemonId, userId, name];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
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
