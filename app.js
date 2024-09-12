//importar libs externas
const express = require("express");
const cors = require("cors");
const { mainRouter } = require("./routes/router");

const port  = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', mainRouter)

app.listen(3000, ()=> {
    console.log("Server started! Port: 3000")
});
