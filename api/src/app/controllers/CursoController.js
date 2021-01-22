import Curso from '../models/Curso';

class CursoController {
  async index(req, res) {
    try {
      const cursos = await Curso.findAll();
      res.json(cursos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new CursoController();
