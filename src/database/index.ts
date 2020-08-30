import { createConnection } from 'typeorm';

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
