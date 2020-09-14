const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'tokenkey';
const JWT_EXPIRED = 60*60;

function analysis(key){
    return jwt.verify(key, PRIVATE_KEY, {expiresIn: JWT_EXPIRED})
}


module.exports = {analysis}