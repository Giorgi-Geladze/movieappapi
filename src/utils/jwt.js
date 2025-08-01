const jwtLib = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES_IN;

exports.sign = (payload) => jwtLib.sign(payload, SECRET, { expiresIn: EXPIRES });
exports.verify = (token) => jwtLib.verify(token, SECRET);