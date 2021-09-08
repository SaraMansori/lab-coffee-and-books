require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const projectName = "Books & Coffee";
app.locals.title = `${projectName}`;

require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
