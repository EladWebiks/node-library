import express, { Application } from 'express';
import authRouter from './routes/auth.js';

const PORT: number = 3000;
const app: Application = express();

app.use(express.json()); // Body parser

app.use('/', authRouter); // Auth Router


app.listen(PORT, () => { console.log("server is on") }) // Listning for requests