const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
// Essa expressão precisa vir antes de todas as rotas, pois eu preciso informar 
// para o express ir no corpo da minha requisição e converter o Json em 
// um objeto do JS, algo intendível pela aplicação
app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3333);