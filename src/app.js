import express from 'express';
import conectaDB from './config/dbConnect.js';
import livro from './models/Livro.js';

const conexao = await conectaDB();

conexao.on('error', (erro) => {
    console.error('Erro ao conectar ao MongoDB: ', erro);
});

conexao.once('open', () => {
    console.log('Conectado ao MongoDB');
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node.js');
});

app.get('/livros', async (req, res) => {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });  

app.get('/livros/:id', (req, res) => {
    const index = buscaLivroPorId(req.params.id);
    res.status(200).json(livros[index]);
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro adicionado com sucesso');
});

app.put('/livros/:id', (req, res) => {
    const index = buscaLivroPorId(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros); 
})

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivroPorId(req.params.id);
    livros.splice(index, 1);
    res.status(200).send('Livro removido com sucesso');
});

export default app;