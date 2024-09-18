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
    origin: 'https://main--subtle-klepon-ef900c.netlify.app', // Domínio do seu front-end no Netlify
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Se você precisar enviar cookies ou cabeçalhos de autenticação
}));

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.use('/api', mainRouter);

// Exporta a função para o Vercel
module.exports = (req, res) => {
    app(req, res);
};
