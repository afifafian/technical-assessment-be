import express from 'express';
import {} from 'dotenv/config';
import morgan from 'morgan';
import { testDb } from './src/config/knex/connection.js';
import routes from './src/routes/index.js';
import { errorHandler } from './src/middlewares/error-handler.js';

const app = express();

testDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);

export default app;
