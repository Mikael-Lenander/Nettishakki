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
const express_1 = require("express");
const toUser_1 = require("../utils/parsers/toUser");
const userService_1 = __importDefault(require("../services/userService"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = (0, toUser_1.toNewUser)(req.body);
        if (newUser.password !== newUser.repeatPassword)
            return res.status(400).json({ error: "Passwords don't match" });
        if (newUser.password.length < 5)
            return res.status(400).json({ error: 'Password must be at least 5 characters long' });
        if (newUser.password.length > 30)
            return res.status(400).json({ error: 'Password must be at most 30 characters long' });
        yield userService_1.default.create(newUser);
        res.status(201);
    }
    catch (error) {
        const errorMessage = error.errors ? error.errors[0].message : error.message;
        res.status(400).json({ error: errorMessage });
    }
}));
exports.default = router;
