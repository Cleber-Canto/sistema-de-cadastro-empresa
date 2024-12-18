import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import corsConfig from '../src/share/utils/cors.config';
import ErrorHandling from '../src/share/utils/errors.handling';
import usuariosRoutes from './routes/usuarios.routes';
import unidadesRoutes from './routes/unidades.routes';
import perfisRoutes from './routes/perfis.routes';  // Importando as rotas de Perfis
import empresasRoutes from './routes/empresas.routes'; // Importando as rotas de Empresas
import authRoutes from './routes/authRoutes'; // Importando as rotas de autenticação

dotenv.config();

const app = express();
app.use(morgan('tiny'));

app.use(corsConfig);

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de URL-encoded
app.use(express.urlencoded({ extended: true }));

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas de usuários
app.use('/api', usuariosRoutes);

// Rotas de unidades
app.use('/api', unidadesRoutes);

// Rotas de perfis
app.use('/api', perfisRoutes);  // Definindo o caminho para perfis

// Rotas de empresas
app.use('/api', empresasRoutes);  // Definindo o caminho para empresas

// Middleware para tratamento de erros
app.use(ErrorHandling);

export default app;
