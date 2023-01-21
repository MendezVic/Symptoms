import { Sequelize } from 'sequelize-typescript';
import { Users } from '../modules/Auth/entities/usersEntity';
import { UserHistory } from '../modules/UserHistory/entities/UserHistoryEntity';

const dbName = process.env.DB_NAME || 'symptoms';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'root';
const dbHost = process.env.DB_HOST || 'mysql';

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  models: [Users, UserHistory],
});

export default sequelizeConnection;
