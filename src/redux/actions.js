
import * as actionTypes from './actionTypes';

export const requestCoordinates = () => { return {type: actionTypes.REQUEST_COORDS} }
export const successCoordinates = coordinates => { return {type: actionTypes.SUCCESS_COORDS, coordinates} }
export const failCoordinates = () => { return {type: actionTypes.FAIL_COORDS} }

export const requestGEO = () => { return {type: actionTypes.REQUEST_GEO} }
export const successGEO = geoLocation => { return {type: actionTypes.SUCCESS_GEO, geoLocation} }
export const failGEO = () => { return {type: actionTypes.FAIL_GEO} }

export const requestHotSearchWords = () => { return {type: actionTypes.REQUEST_HOT_SEARCH_WORDS} }
export const successHotSearchWords = hotSearchWords => { return {type: actionTypes.SUCCESS_HOT_SEARCH_WORDS, hotSearchWords} }
export const failHotSearchWords = () => { return {type: actionTypes.FAIL_HOT_SEARCH_WORDS} }

export const requestEntries = () => { return {type: actionTypes.REQUEST_ENTRIES} }
export const successEntries = entries => { return {type: actionTypes.SUCCESS_ENTRIES, entries} }
export const failEntries = () => { return {type: actionTypes.FAIL_ENTRIES} }

export const requestRestaurants = () => { return {type: actionTypes.REQUEST_RESTAURANT_LIST} }
export const refreshRestaurants = restaurants => { return {type: actionTypes.REFRESH_RESTAURANT_LIST, restaurants} }
export const updateRestaurants = restaurants => { return {type: actionTypes.UPDATE_RESTAURANT_LIST, restaurants} }
export const failRestaurants = () => { return {type: actionTypes.FAIL_RESTAURANT_LIST} }

export const requestAuthentication = () => { return {type: actionTypes.REQUEST_AUTHENTICATION} }
export const successAuthentication = authentication => { return {type: actionTypes.SUCCESS_AUTHENTICATION, authentication} }
export const failAuthentication = () => { return {type: actionTypes.FAIL_AUTHENTICATION} }

export const requestUserInfo = () => { return {type: actionTypes.REQUEST_USER_INFO} }
export const successUserInfo = userInfo => { return {type: actionTypes.SUCCESS_USER_INFO, userInfo} }
export const failUserInfo = () => { return {type: actionTypes.FAIL_USER_INFO} }

export const requestLogin = () => { return {type: actionTypes.REQUEST_LOGIN} }
export const successLogin = login => { return {type: actionTypes.SUCCESS_LOGIN, login} }
export const failLogin = () => { return {type: actionTypes.FAIL_LOGIN} }

export const requestLogout = () => { return {type: actionTypes.REQUEST_LOGOUT} }
export const successLogout = logout => { return {type: actionTypes.SUCCESS_LOGOUT, logout} }
export const failLogout = () => { return {type: actionTypes.FAIL_LOGOUT} }

export const addCart = food => { return {type: actionTypes.ADD_CART, food} }
export const reduceCart = food => { return {type: actionTypes.REDUCE_CART, food} }
export const clearCart = restaurantId => { return {type: actionTypes.CLEAR_CART, restaurantId} }
