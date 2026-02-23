"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const appError_1 = __importDefault(require("../common/error/appError"));
const auth_repositry_1 = require("./auth.repositry");
const hash_1 = require("./utils/hash");
const jwt_1 = require("./utils/jwt");
const login = async (email, password) => {
    const user = await (0, auth_repositry_1.findUserByEmail)(email);
    if (!user || !user.password) {
        throw new appError_1.default("Invalid email or password", 401);
    }
    const isPasswordValid = await (0, hash_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new appError_1.default("Invalid email or password", 401);
    }
    const token = (0, jwt_1.createAccessToken)({
        id: user.id,
        role: user.role,
    });
    return { token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};
exports.login = login;
