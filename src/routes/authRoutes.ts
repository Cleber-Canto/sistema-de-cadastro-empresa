import { Router } from 'express';
import { registerUsuario, loginUsuario } from '../controllers/administracao/auth.controller';

const router = Router();

router.post('/register', registerUsuario); // Corrigida a rota de registro
router.post('/login', loginUsuario); // Corrigida a rota de login

export default router;
