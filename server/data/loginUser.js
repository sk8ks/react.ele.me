// 本地用户数据
const {createToken} = require('../auth/token');
const token = createToken('3678');

module.exports = {
    userInfo: {
        avatar: "",
        balance: 0,
        brand_member_new: 0,
        column_desc: {
            game_desc: "玩游戏领红包",
            game_image_hash: "05f108ca4e0c543488799f0c7c708cb1jpeg",
            game_is_show: 1,
            game_link: "https://gamecenter.faas.ele.me",
            gift_mall_desc: "0元好物在这里"
        },
        current_address_id: 87232152,
        current_invoice_id: 0,
        delivery_card_expire_days: 0,
        email: "eleme@ele.me",
        gift_amount: 3,
        id: 3678,
        is_active: 1,
        is_email_valid: false,
        is_mobile_valid: true,
        mobile: "13333333333",
        point: 240,
        supervip_status: 2,
        user_id: 12345,
        username: "eleme",
    },
    password: '123456',
    vcode: '267453',
    token: token
}
