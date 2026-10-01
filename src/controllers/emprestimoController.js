import { livros } from "./livroController.js";
import { alunos } from "./alunoController.js";

class Emprestimo {
  static id_emprestimo = 0;
  constructor(livro, aluno, dataEmprestimo, dataDevolucao) {
    this.id_emprestimo = ++Emprestimo.id_emprestimo;
    this.livro = livro;
    this.aluno = aluno;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
  }
}

const emprestimos = [];

class EmprestimoController {
  index(req, res) {
    return res.render("emprestimos", { emprestimos, livros, alunos });
  }

  cadastrarEmprestimo(req, res) {
    const { livroId, alunoId, dataEmprestimo, dataDevolucao } = req.body;

    const livro = livros.find((livro) => livro.id_livro === parseInt(livroId));
    const aluno = alunos.find((aluno) => aluno.matricula === parseInt(alunoId));

    // 1. Valida se o livro e o aluno existem
    if (!livro) {
      return res.status(404).send("Livro não encontrado.");
    }
    if (!aluno) {
      return res.status(404).send("Aluno não encontrado.");
    }

    // 2. Valida se o livro está disponível
    if (!livro.disponivel) {
      return res.status(400).send("Livro indisponível para empréstimo.");
    }

    // 3. Altera o status do livro
    livro.disponivel = false;

    // 4. Cria e salva o empréstimo
    const emprestimo = new Emprestimo(
      livro,
      aluno,
      dataEmprestimo,
      dataDevolucao,
    );

    emprestimos.push(emprestimo);
    return res.redirect("/emprestimos");
  }
  devolverEmprestimo(req, res) {
    const { id } = req.params;
    console.log("ID do empréstimo a ser devolvido:", id);
    const i = emprestimos.findIndex(
      (emprestimo) => emprestimo.id_emprestimo === Number(id),
    );
    if (i === -1) {
      return res.redirect("/emprestimos");
    }
    emprestimos[i].livro.disponivel = true;

    emprestimos.splice(i, 1);
    return res.redirect("/emprestimos");
  }
  editar(req, res) {
    const { id } = req.params;
    const emprestimo = emprestimos.find(
      (e) => e.id_emprestimo === Number(id)
    );
    
    if (!emprestimo) {
    return res.redirect("/emprestimos");
    }
      return res.render("editarEmprestimo", {
      emprestimo,
      livros,
      alunos,
      });
  }
  atualizar(req, res) {
    const { id } = req.params;
    const { dataEmprestimo, dataDevolucao } = req.body;
    const emprestimo = emprestimos.find(
      (e) => e.id_emprestimo === Number(id)
    );

    if (!emprestimo) {
      return res.redirect("/emprestimos");
    }

    emprestimo.dataEmprestimo = dataEmprestimo;
    emprestimo.dataDevolucao = dataDevolucao;
    
    return res.redirect("/emprestimos");    
  }
}

export { emprestimos };
export default new EmprestimoController();
