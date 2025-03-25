 import livro from "../models/Livro.js";

 class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
          } catch (erro) {
            console.error(erro);
            res.status(500).json({ error: erro.message });
          }
    }

 }

 export default LivroController;