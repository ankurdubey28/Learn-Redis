"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cached = yield client_1.client.get('todos');
    if (cached)
        return res.json(JSON.parse(cached));
    const { data } = yield axios_1.default.get('https://jsonplaceholder.typicode.com/todos');
    yield client_1.client.set('todos', JSON.stringify(data));
    yield client_1.client.expire('todos', 15);
    console.log(data);
    res.json(data);
}));
app.listen(3001);
