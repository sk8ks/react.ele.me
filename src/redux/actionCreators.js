import {
    fetchGeolocation,
    fetchEntries,
    fetchHotSearchWords,
    fetchRestaurants,
    fetchAddressNearby,
    fetchCategory,
    fetchVerifyCode,
    login,
    logout,
    fetchAuthenticated,
    fetchUserInfo,
    // fetchUserOrders,
    fetchShop, fetchShopMenu,
} from '../service';
import {GeoCoordinates} from '../service/geo';
import * as actions from './actions';
import * as localStore from '../service/localStore';
import { removeCookies, setStore, } from '../utils/utils';


// 获取当前经度纬度
export const coordinatesAction = (resolve, reject) => {
    GeoCoordinates(
        res => resolve(res),
        errorCode => reject(errorCode)
    )
}

// 当前地标信息
export const geolocationAction = (coordinates) =>
    async dispatch => {
        try {
            const geo = await fetchGeolocation(coordinates);
            // const geoState = getState().geoLocation;
            setStore('COORDS', coordinates);
            dispatch(actions.successCoordinates(coordinates));
            dispatch(actions.successGEO(geo));
            return geo;
        } catch (error) {
            throw new Error(error);
        }

    }

// 热门搜索词汇
// export const hotSearchWordsAction = (coordinates = {}) => {
//     return dispatch => {
//         fetchHotSearchWords(coordinates)
//                 .then(res => dispatch(actions.successHotSearchWords(res)))
//                 .catch(error => dispatch(actions.failHotSearchWords()))
//     }
// }
export const hotSearchWordsAction = async (coordinates = {}) => {
    try {
        const res = await fetchHotSearchWords(coordinates);
        if (res && res.length) {
            localStore.setHotSearchWords(res);
            return res;
        }
    } catch (error) {
        throw new Error(error);
    }
}
// 分类入口
// export const entriesAction = () =>
//     dispatch => {
//         return fetchEntries()
//                 .then(res => dispatch(actions.successEntries(res.entries)))
//                 .catch(error => dispatch(actions.failEntries()))
//     }
export const entriesAction = async (coordinates = {}) => {
    try {
        const { entries } = await fetchEntries(coordinates);
        if (entries && entries.length) {
            localStore.setEntries(entries);
            return entries;
        }
    } catch (error) {
        throw new Error(error);
    }
}
// 重新获取商家列表
// export const refreshRestaurantsAction = (query = {}) =>
//     dispatch => {
//         return fetchRestaurants(query)
//             .then(restaurants => {
//                 if (restaurants && restaurants.length) {
//                     localStore.setRestaurants(restaurants);
//                     // dispatch(actions.refreshRestaurants(restaurants));
//                 }
//             })
//             .catch(error => {
//                 // dispatch(actions.failRestaurants({}));
//                 throw new Error(error);
//             })
//     }
export const fetchCategoryAction = () => fetchCategory();
export const filterRestaurantsAction = (query = {}) => fetchRestaurants(query);
export const fetchRestaurantListAction = async (query = {}) => {
    try {
        const list = await fetchRestaurants(query);
        if (list && list.length) {
            if (query.offset === 0) {
                localStore.setRestaurants(list);
            } else if (query.offset > 0) {
                localStore.addRestaurants(list);
            }
        }
        return list;
    } catch (error) {
        throw new Error(error);
    }
}
/**
 * 商家详情
 * @param  {Object}  [query={}] [description]
 * @return {Promise}            [description]
 */
export const fetchShopAction = (shop_id = 0, query = {}) => fetchShop(shop_id, query);
/**
 * 商家菜单
 * @param  {Object}  [query={}] [description]
 * @return {Promise}            [description]
 */
export const fetchShopMenuAction = (shop_id = 0) => fetchShopMenu(shop_id);
/**
 * 向购物车添加商品
 * @param {[type]} food [description]
 */
export const addCartAction = food => dispatch => dispatch(actions.addCart(food));
export const reduceCartAction = food => dispatch => dispatch(actions.reduceCart(food));
export const clearCartAction = restaurantId => dispatch => dispatch(actions.clearCart(restaurantId));

// 附近地区
export const searchAddressNearbyAction = (coords = {}, query = {}) => fetchAddressNearby( {...coords, ...query, offset: 0, limit: 20} );


// 用户认证
export const authenticatedAction = () =>
    async dispatch => {
        try {
            const res = await fetchAuthenticated();
            if (res.userid) {
                dispatch(actions.successAuthentication(res));
                return res;
            }
        } catch (error) {
            // dispatch(actions.failAuthentication({}));
            throw new Error(error);
        }
    }

// 用户信息
export const userInfoAction = uid =>
    async dispatch => {
        try {
            dispatch(actions.requestUserInfo());
            const res = await fetchUserInfo(uid);
            if (res) {
                dispatch(actions.successUserInfo(res));
                return res;
            }
        } catch (error) {
            // dispatch(actions.failUserInfo());
            throw new Error(error);
        }
    }
// 用户信息
export const sendVcodeAction = mobile =>
    async dispatch => {
        try {
            return await fetchVerifyCode(mobile);
        } catch (error) {
            // dispatch(actions.failUserInfo());
            throw new Error(error);
        }
    }
// 登录
export const loginAction = query =>
    async dispatch => {
        try {
            const res = await login(query);
            if (res.login) {
                dispatch(actions.successAuthentication(res));
            } else {
                dispatch(actions.failAuthentication());
            }
            return res;
        } catch (error) {
            dispatch(actions.failAuthentication());
            throw new Error(error);
        }
    }
// 退出登录
export const logoutAction = query =>
    async dispatch => {
        try {
            const res = await logout(query);
            if (res && !res.login) {
                removeCookies('token');
                removeCookies('userid');
                dispatch(actions.failAuthentication());
                dispatch(actions.failUserInfo());
                return res;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
