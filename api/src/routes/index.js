import { Router } from 'express';

/** Controllers */
import AlunosController from '../app/controllers/AlunoController';
/**  * */

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/alunos/:id', AlunosController.read);
routes.post('/alunos', AlunosController.create);
routes.put('/alunos/:id', AlunosController.update);
routes.delete('/alunos/:id', AlunosController.delete);

export default routes;
