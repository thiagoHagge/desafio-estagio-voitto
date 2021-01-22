import { Router } from 'express';

/** Controllers */
import AlunoController from '../app/controllers/AlunoController';
import CursoController from '../app/controllers/CursoController';
import CursoAlunoController from '../app/controllers/CursoAlunoController';
/**  * */

const routes = new Router();

routes.get('/alunos', AlunoController.index);
routes.get('/alunos/:id', AlunoController.read);
routes.post('/alunos', AlunoController.create);
routes.put('/alunos/:id', AlunoController.update);
routes.delete('/alunos/:id', AlunoController.delete);
routes.get('/cursos', CursoController.index);
routes.post('/cursos/aluno', CursoAlunoController.create);

export default routes;
