const express = require("express");

const app = express();

app.use(express.static("./public"));
const start = (req, res) => {
    app.listen(5000, () => console.log(`Server listening on 5000`));
};

start();
