class Livro {
  static id_livro = 0;

  constructor(titulo, autor, ano) {
    this.id_livro = ++Livro.id_livro;
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.disponivel = true;
  }
}

const livros = [];

class livroController {
  cadastrarLivro(req, res) {
    const { titulo, autor, ano } = req.body;
    // const novoLivro = new Livro(titulo, autor, ano);
    // livros.push(novoLivro);
    livros.push(new Livro(titulo, autor, ano));
    res.redirect("/livros");
  }
  index(req, res) {
    res.render("livros", { livros });
  }
}

export { livros }; //fiz hj

export default new livroController();
