
const config = require('../config/config')
const { userInfo } = require('../data/loginUser')
const jwt = require('jsonwebtoken')
const moment = require('moment')


/**
 * token认证
 * @param  {String} decodedToken [description]
 * @param  {String} uid          [description]
 * @return {[type]}              [description]
 */
const authenticate = (decodedToken) => {
    const now = moment().valueOf();
    if( decodedToken.id == userInfo.id ) {
        return !!1;
    } else {
        return !1;
    }
}

const verifyToken = (req, res, next) => {
    const now = moment().valueOf();
    const token = req.cookies.token || req.headers.Authorization;
    const secret = config.token.secret;
    if (!token) {
        req.user = null;
    } else {
        const decoded = jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                req.user = null;
            } else {
                req.user = {
                    id: decoded.id
                };
            }
        });
    }
    next();
}

module.exports = {
    authenticate: authenticate,
    verifyToken: verifyToken
}
