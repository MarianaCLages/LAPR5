import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import caminho from './routes/caminhoRoute';
import camiao from './routes/camiaoRoute';
import empacotamento from './routes/empacotamentoRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	caminho(app);
	camiao(app);
	empacotamento(app);
	
	return app
}