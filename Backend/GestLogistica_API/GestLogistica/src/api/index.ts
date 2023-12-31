import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import path from './routes/pathRoute';
import truck from './routes/truckRoute';
import packaging from './routes/packagingRoute';
import trip from './routes/tripRoute';

export default () => {
	const app = Router();

	packaging(app);
	auth(app);
	user(app);
	role(app);
	path(app);
	truck(app);
	trip(app);
	
	return app
}