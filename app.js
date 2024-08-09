const express = require("express");
const app = express();
const cors = require("cors");
require("./connect/conn");
const auth = require("./routes/auth")
const list = require("./routes/list")


app.use(express.json());
app.use(cors());
app.use("/api", auth);
app.use("/api/v1", list);

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(1000, () => {
    console.log("listening")
})