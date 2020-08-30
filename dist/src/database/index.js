"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var user = process.env.DB_USER;
var userPassword = process.env.DB_USER_PASSWORD;
var cluster = process.env.DB_CLUSTER;
var uri = "mongodb+srv://teste:teste@cluster0.gzxwt.mongodb.net/Project?retryWrites=true&w=majority";
typeorm_1.createConnection({
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
