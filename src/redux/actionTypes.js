// action types
export const REQUEST_COORDS = 'REQUEST_COORDS';     // 请求坐标
export const SUCCESS_COORDS = 'SUCCESS_COORDS';     // 成功获得坐标
export const FAIL_COORDS = 'FAIL_COORDS';           // 获取坐标失败

export const REQUEST_GEO = 'REQUEST_GEO';       // 请求地理位置
export const SUCCESS_GEO = 'SUCCESS_GEO';       // 获取地理位置
export const FAIL_GEO = 'FAIL_GEO';             // 获取地理位置失败

export const REQUEST_HOT_SEARCH_WORDS = 'REQUEST_HOT_SEARCH_WORDS';     // 请求热门词
export const SUCCESS_HOT_SEARCH_WORDS = 'SUCCESS_HOT_SEARCH_WORDS';     // 获取热门词
export const FAIL_HOT_SEARCH_WORDS = 'FAIL_HOT_SEARCH_WORDS';           // 获取热门词失败

export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';       // 请求分类入口列表
export const SUCCESS_ENTRIES = 'SUCCESS_ENTRIES';       // 获取分类入口列表
export const FAIL_ENTRIES = 'FAIL_ENTRIES';             // 获取分类入口列表失败

// export const REQUEST_ENTRYLIST = 'REQUEST_ENTRYLIST';
// export const SUCCESS_ENTRYLIST = 'SUCCESS_ENTRYLIST';
// export const FAIL_ENTRYLIST = 'FAIL_ENTRYLIST';

export const REQUEST_RESTAURANT_LIST = 'REQUEST_RESTAURANT_LIST';       // 请求店铺列表
export const REFRESH_RESTAURANT_LIST = 'REFRESH_RESTAURANT_LIST';       // 重新获取店铺列表
export const UPDATE_RESTAURANT_LIST = 'UPDATE_RESTAURANT_LIST';         // 更新店铺列表
export const FAIL_RESTAURANT_LIST = 'FAIL_RESTAURANT_LIST';             // 获取店铺列表失败

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';     // 请求分类列表
export const SUCCESS_CATEGORIES = 'SUCCESS_CATEGORIES';     // 获取分类列表
export const FAIL_CATEGORIES = 'FAIL_CATEGORIES';           // 获取分类列表失败

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';       // 用户认证
export const SUCCESS_AUTHENTICATION = 'SUCCESS_AUTHENTICATION';       // 认证成功
export const FAIL_AUTHENTICATION = 'FAIL_AUTHENTICATION';             // 认证失败

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';       // 请求用户信息
export const SUCCESS_USER_INFO = 'SUCCESS_USER_INFO';       // 获取用户信息
export const FAIL_USER_INFO = 'FAIL_USER_INFO';             // 获取用户信息失败

export const REQUEST_ORDERS = 'REQUEST_ORDERS';     // 请求订单列表
export const SUCCESS_ORDERS = 'SUCCESS_ORDERS';     // 获取订单列表
export const FAIL_ORDERS = 'FAIL_ORDERS';           // 获取订单列表失败

export const AUTHENTICATED = 'AUTHENTICATED';       // 认证状态

export const REQUEST_LOGIN = 'REQUEST_LOGIN';     // 请求登录
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';     // 登录成功
export const FAIL_LOGIN = 'FAIL_LOGIN';           // 登录失败

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';     // 退出登录
export const SUCCESS_LOGOUT = 'REQUEST_LOGOUT';     // 退出登录成功
export const FAIL_LOGOUT = 'FAIL_LOGOUT';           // 退出登录失败

export const ADD_CART = 'ADD_CART';     // 加入当前商铺购物车
export const REDUCE_CART = 'REDUCE_CART';     // 从当前商铺购物车删除一件商品
export const CLEAR_CART = 'CLEAR_CART';     // 清空当前商铺购物车
