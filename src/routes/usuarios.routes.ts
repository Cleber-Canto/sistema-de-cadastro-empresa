import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  listUsuarios,
  createUsuario,
  deleteUsuario,
  editUsuario,
  getOneUsuario
} from '../controllers/administracao/usuarios.controllers';

const router = Router();

router.route('/usuarios')
  .get(authenticateToken, listUsuarios)
  .post(createUsuario);  // Remove a autenticação para criação do usuário

router.route('/usuario/:id')
  .get(authenticateToken, getOneUsuario)
  .delete(authenticateToken, deleteUsuario)
  .put(authenticateToken, editUsuario);

export default router;
