"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewUser = exports.toUserCredentials = void 0;
const parsers_1 = require("./parsers");
function toUserCredentials({ username, password }) {
    return {
        username: (0, parsers_1.parseString)(username, 'username'),
        password: (0, parsers_1.parseString)(password, 'password')
    };
}
exports.toUserCredentials = toUserCredentials;
function toNewUser({ username, password, repeatPassword }) {
    return {
        ...toUserCredentials({ username, password }),
        repeatPassword: (0, parsers_1.parseString)(repeatPassword, 'password confirmation')
    };
}
exports.toNewUser = toNewUser;
