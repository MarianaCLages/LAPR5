import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import caminho from './routes/caminhoRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	caminho(app);
	
	return app
}