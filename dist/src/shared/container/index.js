"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var UserRepository_1 = __importDefault(require("../../modules/users/infra/typeorm/repositories/UserRepository"));
tsyringe_1.container.registerSingleton('UserRepository', UserRepository_1.default);
