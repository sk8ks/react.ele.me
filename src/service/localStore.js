import { setStore, getStore, removeStore } from '../utils/utils';

// 存放已加载的数据，避免重复加载
let { entries, hotSearchWords, restaurants } = {
    entries: [],
    hotSearchWords: [],
    restaurants: [],
};;

export const setRestaurants = (restaurantsArray = []) => {
    if (restaurantsArray.length) {
        restaurants = [...restaurantsArray];
    }
}
export const getRestaurants = () => restaurants;
export const addRestaurants = (restaurantsArray = []) => {
    if (restaurantsArray.length) {
        restaurants = [...restaurants, ...restaurantsArray];
    }
}
//
export const setEntries = (entriesArray = []) => {
    if (entriesArray.length) {
        entries = [...entriesArray];
    }
}
export const getEntries = () => entries;
//
export const setHotSearchWords = (hotSearchWordsArray = []) => {
    if (hotSearchWordsArray.length) {
        hotSearchWords = [...hotSearchWordsArray];
    }
}
export const getHotSearchWords = () => hotSearchWords;
