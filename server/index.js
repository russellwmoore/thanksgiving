const { app } = require('./app');
const PORT = 3000;
const { doSeed } = require('../seed');
const { db } = require('../db');
db.sync({ force: true }).then(() => {
  // maybe have seeding be a separate script?
  doSeed().then(() => {
    app.listen(PORT, () => {
      console.log('listenin');
    });
  });
});
