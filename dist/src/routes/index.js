"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import signInRouter from '../modules/signIn/infra/http/routes/signInRouter';
// import signin from '@modules/users/infra/http/routes/signin.routes';
// import signup from '../modules/users/infra/http/routes/signup.routes';
var users_routes_1 = __importDefault(require("../modules/users/infra/http/routes/users.routes"));
var routes = express_1.Router();
// routes.use('/signin', signInRouter);
routes.use('/signup', users_routes_1.default);
routes.use('/user', users_routes_1.default);
routes.use('/signin', users_routes_1.default);
exports.default = routes;
