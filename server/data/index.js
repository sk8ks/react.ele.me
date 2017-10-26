// 模拟数据
const weather = require('./weather');
const entries = require('./entries');
const geolocation = require('./geolocation');
const hotSearchWords = require('./hotSearchWords');
const restaurants = require('./restaurants');
const searchAddressNearby = require('./searchAddressNearby');
const categories = require('./categories');
const vcode = require('./vcode');
const loginUser = require('./loginUser');
const orders = require('./orders');
const oldOrders = require('./oldOrders');
const shop = require('./shop');
const shopMenu = require('./shopMenu')

module.exports = {
    weather: weather,
    entries: entries,
    geolocation: geolocation,
    hotSearchWords: hotSearchWords,
    restaurants: restaurants,
    searchAddressNearby: searchAddressNearby,
    categories: categories,
    vcode: vcode,
    loginUser: loginUser,
    orders: orders,
    oldOrders: oldOrders,
    shop: shop,
    shopMenu: shopMenu
}
