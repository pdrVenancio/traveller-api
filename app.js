// //importar libs externas
// const express = require("express");
// const cors = require("cors");
// const { mainRouter } = require("./routes/router");

// const port  = process.env.PORT || 3001
// const app = express();

// app.use(express.json());
// app.use(cors())

// app.get("/", (req, res) => {
//     res.json({ message: "Hello World" });
// });

// app.use('/api', mainRouter)

// app.listen(3000, ()=> {
//     console.log("Server started! Port: 3000")
// });

// /api/app.js
const express = require("express");
const cors = require("cors");
const { mainRouter } = require("../routes/router"); // Ajuste o caminho se necessário

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.use('/api', mainRouter);

// Exporta a função para o Vercel
module.exports = (req, res) => {
    app(req, res);
};
