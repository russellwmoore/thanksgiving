const { app } = require("./app");
const PORT = 3000;
const { db } = require("../db");

/*
  DO NOT TOUCH THIS FILE
*/

db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("listenin");
  });
});
