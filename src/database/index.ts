import { createConnection, Connection } from 'typeorm';
import path from 'path';

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const uri = `mongodb+srv://teste:teste@cluster0.gzxwt.mongodb.net/Project?retryWrites=true&w=majority`;
createConnection({
  url: uri,
  type: 'mongodb',
  database: 'Project',
  w: 'majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logger: 'advanced-console',
  logging: 'all',
  entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
});
