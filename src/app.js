import express from 'express';
import conectaDB from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await conectaDB();

conexao.on('error', (erro) => {
    console.error('Erro ao conectar ao MongoDB: ', erro);
});

conexao.once('open', () => {
    console.log('Conectado ao MongoDB');
});

const app = express();
routes(app);

app.get('/livros/:id', (req, res) => {
    const index = buscaLivroPorId(req.params.id);
    res.status(200).json(livros[index]);
})

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