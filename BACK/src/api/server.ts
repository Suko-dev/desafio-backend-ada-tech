import express from 'express';
import cors from 'cors';
import { errorHandlingMiddleware } from './middlewares/errorHandling';
import { LoginController } from './controllers/login/login.controller';
import { authMiddleware } from './middlewares/authentication';
import { CardController } from './controllers/card/card.controller';
import { modificationLogging } from './middlewares/modification-logging';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('health-check', (req, res) => {
  res.status(200).send('server ok');
});

app.post('/login', LoginController.login);

app.use(authMiddleware);

app.use(modificationLogging);

app.post('/cards', CardController.create);

app.get('/cards', CardController.get);

app.put('/cards/:id', CardController.put);

app.delete('/cards/:id', CardController.delete);

app.use(errorHandlingMiddleware);

export default app;
