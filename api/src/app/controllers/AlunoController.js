import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll();
      res.json(alunos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  async read(req, res) {
    const { id } = req.params;
    try {
      const aluno = await Aluno.findOne( {
        where: {
          id:Number(id)
        }
      })
        return res.status(200).json(aluno)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async create(req, res) {
    const novoAluno = req.body;
    try {
      const alunoCriado = await Aluno.create(novoAluno);
      return res.json(alunoCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await Aluno.update(novasInfos, {
        where: {
          id:Number(id)
        }
      })
      const alunoAtualizado = await Aluno.findOne( {
        where: {
          id:Number(id)
        }
      })
      return res.json(alunoAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }

  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Aluno.destroy({
        where: {
          id:Number(id)
        }
      })
      return res.json({mensagem: `Aluno referente ao id ${id} deletado`})
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new AlunoController();
