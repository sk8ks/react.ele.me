const path = require('path');
const express = require('express');
const router = require('./routers/expressApiRouter');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { token } = require('./config/config');

const app = express()
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(allowCrossDomain);
// token认证
app.use(expressJwt({secret: token.secret}).unless({path: ['/login', '/static']}));
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        console.log('err: ', err.message);
        req.user = null;
        next();
    }
});

app.use('/api', router);

// serve pure static assets
const staticPath = path.posix.join('/', 'static');
app.use(staticPath, express.static('./static'));

const server = app.listen(3102,  () => {
    console.log('react.ele.me listening on port 3102');
})
