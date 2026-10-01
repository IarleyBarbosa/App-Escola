import { livros } from "./livroController.js";
import { alunos } from "./alunoController.js";

class HomeController {
  index(req, res) {
    return res.render("home", { livros, alunos });
  }
}
export default new HomeController();
