const moment = require('moment')

module.exports = {
    token: {    // token配置
        secret: 'react.ele.me',      // 密匙
        expires: new Date(moment().add(7, 'days').valueOf()),      // 过期时间（毫秒）
        expiresIn: '7d',        //
    }
}
