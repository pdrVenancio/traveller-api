// const express = require("express");
// const cors = require("cors");
// const { mainRouter } = require("./routes/router"); // Ajuste o caminho se necessário

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//     res.json({ message: "Hello World" });
// });

// app.use('/api', mainRouter);

// // Exporta a função para o Vercel
// module.exports = (req, res) => {
//     app(req, res);
// };


const express = require("express");
const cors = require("cors");
const { mainRouter } = require("./routes/router"); // Ajuste o caminho se necessário

const app = express();

app.use(express.json());

// Permitir requisições de um domínio específico
app.use(cors({
    origin: 'https://main--subtle-klepon-ef900c.netlify.app'
}));

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.use('/api', mainRouter);

// Exporta a função para o Vercel
module.exports = (req, res) => {
    app(req, res);
};
