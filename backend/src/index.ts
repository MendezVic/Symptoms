import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Action, useExpressServer } from 'routing-controllers';
import path from 'path';
import sequelizeConnection from './config/db';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import AuthService from './modules/Auth/AuthService';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
useExpressServer(app, {
  authorizationChecker: async (action: Action) => {
    try {
      const authService = new AuthService();
      const token = action.request.headers['authorization'].split(' ')[1];
      const payload = jwt.verify(token, process.env.SECRET_JWT);
      const user = await authService.findById(payload.id);

      if (!user) return false;
      action.request.user = user.get({ plain: true });
      return true;
    } catch {
      return false;
    }
  },
  currentUserChecker: (action: Action) => action.request.user,
  // classTransformer: true,
  routePrefix: '/api',
  cors: true,
  development: process.env.NODE_ENV === 'development',
  controllers: [path.join(__dirname, '/modules/**/*Controller.ts')],
});

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(port, async () => {
  await sequelizeConnection
    .sync()
    .then(() => console.log('Connected to Database'))
    .catch(e => console.log(e));
  return console.log(`Express is listening at http://localhost:${port}`);
});
