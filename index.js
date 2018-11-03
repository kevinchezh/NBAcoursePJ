const express = require("express");
const dev = require("./config/dev");
const app = express();

require("./routes/routes")(app);

const PORT = 5000;
app.listen(PORT);