import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actionTypes from './actionTypes';
import { setStore, getStore, } from '../utils/utils';

// 从localStorage获取地理坐标
const getCoordinatesFromStore = () => {
    const coordinates = getStore('COORDS');
    return coordinates ? JSON.parse(coordinates) : {latitude: null, longitude: null};
}
// 更新地理坐标
const coordinates = (state = getCoordinatesFromStore(), action = {}) => {
    switch (action.type) {
        case actionTypes.SUCCESS_COORDS:
            return {...state, ...action.coordinates}
        case actionTypes.FAIL_COORDS:
            return {latitude: null, longitude: null}
        default:
            return state;
    }
}
// 地理位置信息
const geoLocation = (state = {
    city_id: null,
    geohash: null,
    address: null,
    name: null,
    city: null
}, action = {}) => {
    switch (action.type) {
        case actionTypes.SUCCESS_GEO:
            return {...state, ...action.geoLocation}
        case actionTypes.FAIL_GEO:
            return {
                city_id: null,
                geohash: null,
                address: null,
                name: null,
                city: null
            };
        default:
            return state;
    }
}

// 热门搜索词汇
// const hotSearchWords = (state = [], action) => {
//     switch (action.type) {
//         case actionTypes.SUCCESS_HOT_SEARCH_WORDS:
//             return [...state, ...action.hotSearchWords];
//         case actionTypes.FAIL_HOT_SEARCH_WORDS:
//             return [];
//         default:
//             return state;
//     }
// }

// 分类入口数据
// const entries = (state = [], action) => {
//     switch (action.type) {
//         case actionTypes.SUCCESS_ENTRIES:
//             return [...state, ...action.entries];
//         case actionTypes.FAIL_ENTRIES:
//             return [];
//         default:
//             return state;
//     }
// }

// 商家列表数据
const restaurants = (state = [], action = {}) => {
    switch (action.type) {
        case actionTypes.REFRESH_RESTAURANT_LIST:
            return action.restaurants;
        case actionTypes.UPDATE_RESTAURANT_LIST:
            return [...state, ...action.restaurants];
        case actionTypes.FAIL_RESTAURANT_LIST:
            return [];
        default:
            return state;
    }
}
// 用户认证
const authentication = (state = {authenticated: !1, login: !1, userid: 0}, action = {}) => {
    switch (action.type) {
        case actionTypes.SUCCESS_AUTHENTICATION:
            return {...state, authenticated: !!1, login: !!1, ...action.authentication}
        case actionTypes.FAIL_AUTHENTICATION:
            return {...state, authenticated: !1, login: !1, userid: 0}
        // case actionTypes.SUCCESS_LOGOUT:
        //     return {...state, authenticated: !!1, login: !!1, ...action.authentication}
        default:
            return state;
    }
}
// 用户信息
const userInfo = (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.SUCCESS_USER_INFO:
            return {...state, ...action.userInfo}
        case actionTypes.FAIL_USER_INFO:
            return {};
        default:
            return state;
    }
}
// 用户信息
const login = (state = !1, action = {}) => {
    switch (action.type) {
        case actionTypes.SUCCESS_LOGIN:
            return !!1;
        case actionTypes.FAIL_LOGIN:
            return !1;
        default:
            return state;
    }
}
// 地址列表
// const addressList = (state = [], action) => {
//     switch (action.type) {
//         case SUCCESS_ADDRESS_NEARBY:
//             return [...state, action.addressList];
//         case FAIL_ADDRESS_NEARBY:
//             return state;
//         default:
//             return state;
//     }
// }
//
// const categories = (state = [], action) => {
//     switch (action.type) {
//         case actionTypes.SUCCESS_CATEGORIES:
//             return [...state, action.categories];
//         case actionTypes.FAIL_CATEGORIES:
//             return state;
//         default:
//             return state;
//     }
// }

// 购物车
const cart = (state = (JSON.parse(getStore('CART')) || {}), action = {}) => {
    let foodList = [];
    let item = {};
    let _state = {...state};

    // let amount = _state.amount || 0;
    switch (action.type) {
        case actionTypes.ADD_CART:
            foodList = [...(state[action.food.restaurant_id] || foodList)];
            item = foodList.find(it => it.id === action.food.id);
            if (item) {
                item.quantity++;
                _state = {
                    ...state,
                    [action.food.restaurant_id]:[...foodList],
                };
            } else {
                _state = {
                    ...state,
                    [action.food.restaurant_id]:[...foodList, {...action.food, quantity: 1}],
                };
            }
            setStore('CART', _state);
            return _state;
        case actionTypes.REDUCE_CART:
            foodList = [...(state[action.food.restaurant_id] || foodList)];
            item = foodList.find(it => it.item_id === action.food.item_id);
            // const index = foodList.findIndex(it => it.id == food.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    foodList = foodList.filter(it => it.item_id !== item.item_id);
                }
                _state = {
                    ...state,
                    [action.food.restaurant_id]:[...foodList],
                };
            }
            setStore('CART', _state);
            return _state;
        case actionTypes.CLEAR_CART:
            _state = {...state};
            _state[action.restaurantId] = [];
            setStore('CART', _state);
            return _state;
        default:
            return _state;
    }
}

const reducer = combineReducers({
    coordinates,
    geoLocation,
    restaurants,
    authentication,
    userInfo,
    login,
    cart,
    form: formReducer,
})

export default reducer;
