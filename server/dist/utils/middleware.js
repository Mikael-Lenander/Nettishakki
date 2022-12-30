"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.authenticateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("./config");
const authenticateToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7);
        const user = (0, exports.verifyToken)(token);
        console.log('user payload', user);
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};
exports.authenticateToken = authenticateToken;
const verifyToken = (token) => {
    console.log('Verifying token', token);
    if (token == null)
        throw Error('Unauthorized');
    let user = null;
    jwt.verify(token, config_1.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err)
            throw Error('Unauthorized');
        user = payload;
    });
    if (user == null)
        throw Error('Unauthorized');
    return user;
};
exports.verifyToken = verifyToken;
