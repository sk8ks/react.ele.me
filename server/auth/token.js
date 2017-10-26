
const {token} = require('../config/config');
const jwt = require('jsonwebtoken');


// 生成token
const createToken = id => {
    return jwt.sign(
        {
            id: id, // 用户信息唯一标识符
            expires: token.expires,   // 过期时间
        },
        token.secret,   // 密匙
        {expiresIn: token.expiresIn}
    )
}


module.exports = {
    createToken: createToken
}
