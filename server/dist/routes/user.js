"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toUser_1 = require("../utils/parsers/toUser");
const userService_1 = __importDefault(require("../services/userService"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const newUser = (0, toUser_1.toNewUser)(req.body);
        if (newUser.password !== newUser.repeatPassword)
            return res.status(400).json({ error: "Passwords don't match" });
        if (newUser.password.length < 5)
            return res.status(400).json({ error: 'Password must be at least 5 characters long' });
        if (newUser.password.length > 30)
            return res.status(400).json({ error: 'Password must be at most 30 characters long' });
        if (newUser.username == 'white' || newUser.username == 'black')
            return res.status(400).json({ error: 'Username not allowed' });
        await userService_1.default.create(newUser);
        res.send('Signup successful');
    }
    catch (error) {
        const errorMessage = error.errors ? error.errors[0].message : error.message;
        res.status(400).json({ error: errorMessage });
    }
});
exports.default = router;
