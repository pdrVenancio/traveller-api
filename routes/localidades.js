// //importar libs externas
// const express = require('express'); //npm i express

// //O router permite separar nosso servidor em rotas
// const localidadeRouter = express.Router();    

// //libs para banco de dados
// const fs = require('fs');
// const path = require('path');

// // importa a funcao isAdmin para bloquear algumas rotas ao cliente comum
// const { isAdmin } = require('./../middlewares/isAdmin');


// //Conexao com banco de dados
// const bdPath = path.join(__dirname,'..','db','localidades.json');
// const localidades = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

// // a rota get retorna todas as localidades com passagens disponiveis
// localidadeRouter.get('/', (req, res) => {

//     const locais = []

//     for(let local of localidades){
//         if (local.passagens != 0){
//             locais.push(local)
//         }
//     }

//     res.status(200).send(locais)
// })

// // a rota post adiciona uma nova localidade
// localidadeRouter.post('/', isAdmin, (req, res) => {

//     const {nome, latitude, longitude, precoPassagem, passagens } = req.body;
//     const latNum = parseFloat(latitude); 
//     const longNum = parseFloat(longitude);
//     const precNum = parseFloat(precoPassagem); 
//     const passNum = parseInt(passagens, 10); 

//     let id;
//     if(localidades.length > 0){
//         id = localidades[localidades.length - 1].id + 1;
//     }else{
//         id = 0;
//     }

//     const imgs = [];

//     const novoLocal = {
//         id,
//         nome,
//         latitude: latNum,
//         longitude: longNum,
//         precoPassagem: precNum,
//         passagens: passNum,
//         imgs
//     };


//     localidades.push(novoLocal);

//     fs.writeFileSync(bdPath, JSON.stringify(localidades, null, 2));

//     res.status(200).send(novoLocal);
// });

// // a rota put atualiza alguma localidade
// localidadeRouter.put('/', isAdmin, (req, res) => {

//     const { id, nome, latitude, longitude, precoPassagem, passagens } = req.body;
//     const latNum = parseFloat(latitude); // Converter lat para número
//     const longNum = parseFloat(longitude); // Converter long para número
//     const precNum = parseFloat(precoPassagem); // Converter prec para número
//     const passNum = parseInt(passagens, 10); // Converter passagens para número inteiro

//     const imgs = [];

//     const novoLocal = {
//         id,
//         nome,
//         latitude: latNum,
//         longitude: longNum,
//         precoPassagem: precNum,
//         passagens: passNum,
//         imgs
//     };

//     const acharIndex = (p) => {
//         return p.id === Number(id);
//     };

//     const index = localidades.findIndex(acharIndex);

//     localidades.splice(index, 1, novoLocal);

//     fs.writeFileSync(bdPath, JSON.stringify(localidades, null, 2));

//     res.status(200).send(novoLocal);
// });

// // a rota delete apaga uma localidade ao se passar um id
// localidadeRouter.delete('/:id', isAdmin, (req, res) => {

//     const { id } = req.params;

//     const acharIndex = (p) => {
//         return p.id === Number(id);
//     };

//     const index = localidades.findIndex(acharIndex);

//     localidades.splice(index, 1);

//     fs.writeFileSync(bdPath, JSON.stringify(localidades, null, 2));

//     res.status(204).send('Localidade Removida!');
// });

// module.exports = { localidadeRouter };
// importar libs externas
const express = require('express'); // npm i express

// O router permite separar nosso servidor em rotas
const localidadeRouter = express.Router();

// libs para banco de dados
const fs = require('fs');
const path = require('path');

// importa a funcao isAdmin para bloquear algumas rotas ao cliente comum
const { isAdmin } = require('./../middlewares/isAdmin');

// Conexao com banco de dados
const bdPath = path.join(__dirname, '..', 'db', 'localidades.json');
let localidades;

// Função para ler o arquivo JSON e atualizar a variável locais
const carregarLocalidades = () => {
    try {
        localidades = JSON.parse(fs.readFileSync(bdPath, { encoding: 'utf-8' }));
    } catch (error) {
        console.error('Erro ao ler o arquivo de localidades:', error);
        localidades = [];
    }
};

// Carregar localidades na inicialização
carregarLocalidades();

// a rota get retorna todas as localidades com passagens disponíveis
localidadeRouter.get('/', (req, res) => {
    try {
        const locais = localidades.filter(local => local.passagens > 0);
        res.status(200).send(locais);
    } catch (error) {
        console.error('Erro ao recuperar localidades:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

// a rota post adiciona uma nova localidade
localidadeRouter.post('/', isAdmin, (req, res) => {
    try {
        const { nome, latitude, longitude, precoPassagem, passagens } = req.body;
        const latNum = parseFloat(latitude);
        const longNum = parseFloat(longitude);
        const precNum = parseFloat(precoPassagem);
        const passNum = parseInt(passagens, 10);

        if (isNaN(latNum) || isNaN(longNum) || isNaN(precNum) || isNaN(passNum)) {
            return res.status(400).send('Dados inválidos.');
        }

        let id;
        if (localidades.length > 0) {
            id = localidades[localidades.length - 1].id + 1;
        } else {
            id = 0;
        }

        const imgs = [];
        const novoLocal = {
            id,
            nome,
            latitude: latNum,
            longitude: longNum,
            precoPassagem: precNum,
            passagens: passNum,
            imgs
        };

        localidades.push(novoLocal);
        fs.writeFileSync(bdPath, JSON.stringify(localidades, null, 2));

        res.status(200).send(novoLocal);
    } catch (error) {
        console.error('Erro ao adicionar localidade:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

// a rota put atualiza alguma localidade
localidadeRouter.put('/', isAdmin, (req, res) => {
    try {
        const { id, nome, latitude, longitude, precoPassagem, passagens } = req.body;
        const latNum = parseFloat(latitude);
        const longNum = parseFloat(longitude);
        const precNum = parseFloat(precoPassagem);
        const passNum = parseInt(passagens, 10);

        if (isNaN(latNum) || isNaN(longNum) || isNaN(precNum) || isNaN(passNum)) {
            return res.status(400).send('Dados inválidos.');
        }

        const novoLocal = {
            id,
            nome,
            latitude: latNum,
            longitude: longNum,
            precoPassagem: precNum,
            passagens: passNum,
            imgs: []
        };

        const index = localidades.findIndex(p => p.id === Number(id));

        if (index === -1) {
            return res.status(404).send('Localidade não encontrada.');
        }

        localidades.splice(index, 1, novoLocal);
        fs.writeFileSync(bdPath, JSON.stringify(localidades, null, 2));

        res.status(200).send(novoLocal);
    } catch (error) {
        console.error('Erro ao atualizar localidade:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

// a rota delete apaga uma localidade ao se passar um id
localidadeRouter.delete('/:id', isAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const index = localidades.findIndex(p => p.id === Number(id));

        if (index === -1) {
            return res.status(404).send('Localidade não encontrada.');
        }
        localidades.splice(index, 1);
        fs.writeFileSync(bdPath, JSON.stringify(localidades, null, 2));

        res.status(204).send('Localidade Removida!');
    } catch (error) {
        console.error('Erro ao remover localidade:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

module.exports = { localidadeRouter };
