import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionControllers from './controllers/ConnectionsController';

const routes =express.Router();
const classesControllers= new ClassesControllers();
const connectionsController= new ConnectionControllers();

routes.get('/classes',classesControllers.index);
routes.post('/classes',classesControllers.create);

routes.post('/connections',connectionsController.create);
routes.get('/connections',connectionsController.index);
console.log("using routes");

export default routes;