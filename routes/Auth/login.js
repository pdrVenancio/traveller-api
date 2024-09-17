const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const bdPath = path.join(__dirname,'..', '..', 'db','banco-dados-usuario.json');
const usuariosCadastrados = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));
console.log(usuariosCadastrados)

loginRouter.post('/', async (req,res) => {
    try{
        const {email, password} = req.body; 
        for (let user of usuariosCadastrados){
            if(user.email === email){
                const passwordValidado = await bcrypt.compare(password, user.password);
                if(passwordValidado===true){
                    const tokenAcesso = jwt.sign(user, 'dslbakdjbasldblshdbashdbashdjlsabdhjdblasdbjdbsflhbhwlebrewhjjkfkajdç', { expiresIn: '1h' });
                    return res.status(200).json(tokenAcesso);
                }
                else
                    return res.status(422).send(`Usuario ou senhas incorretas.`);
            }   
        }
        return res.status(409).send(`Usuario com email ${email} não existe!`);
    }catch (error) {
        console.error('Erro ao adicionar usuario:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

module.exports = {loginRouter}
