const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const routes = require("./routes")
app.use(routes);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server succesfully listening on PORT: ${PORT}`));