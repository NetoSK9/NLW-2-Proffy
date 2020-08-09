import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(routes);

// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

//Corpo(request Body); Dados para criação ou atualização de um registro;
// Route Parms: Identificar quak recusro eu quero atualizar ou deletar.
//Query Parms: Paginação, filtros, ordenação
app.listen(3333);