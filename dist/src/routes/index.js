"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import signInRouter from '../modules/signIn/infra/http/routes/signInRouter';
var signin_routes_1 = __importDefault(require("@modules/users/infra/http/routes/signin.routes"));
var signup_routes_1 = __importDefault(require("../modules/users/infra/http/routes/signup.routes"));
var users_router_1 = __importDefault(require("../modules/users/infra/http/routes/users.router"));
var routes = express_1.Router();
// routes.use('/signin', signInRouter);
routes.use('/signup', signup_routes_1.default);
routes.use('/user', users_router_1.default);
routes.use('/signin', signin_routes_1.default);
exports.default = routes;
