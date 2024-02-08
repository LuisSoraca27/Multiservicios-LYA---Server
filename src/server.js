import dotenv from 'dotenv';
import server from './app.js';

// Utils
import initModels from './Models/initModel.js';
import db from './Utils/database.util.js';

dotenv.config({ path: './config.env' });

const startServer = async () => {
	try {
		await db.authenticate();

		// Establish the relations between models
		initModels();

		await db.sync();

		// Set server to listen
		const PORT = process.env.PORT || 4002;

		server.listen(PORT, () => {
			console.log('Servidor en linea en el puerto: ', PORT);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer(); 
