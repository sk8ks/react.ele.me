/**
 * 	配置开发环境和线上环境
 */

let baseUrl = '';
let apiUrl = 'http://localhost:3102';
let routerMode = 'history';
let staticUrl = '';
let errImg = '';
let noDataImg = '';

if (process.env.NODE_ENV == 'development') {
	errImg = '/static/img/9fb04779371b5b162b41032baf5f3gif.gif';
	noDataImg = '/static/img/4efda8c6bf4734d39faf86fe190c3gif.gif';
}
else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://rossi.wang:3002';
	staticUrl = 'http://rossi.wang:8081';
	apiUrl = 'http://rossi.wang:3101';
	errImg = 'http://rossi.wang:8081/vue2.ele.me/img/9fb04779371b5b162b41032baf5f3gif.gif';
	noDataImg = 'http://rossi.wang:8081/vue2.ele.me/img/4efda8c6bf4734d39faf86fe190c3gif.gif';
}

export {
	baseUrl,
	routerMode,
	staticUrl,
	apiUrl,
	errImg,
	noDataImg
}
