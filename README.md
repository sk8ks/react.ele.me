# react.ele.me
react仿饿了么项目，用于学习研究react。
# 技术栈
webpack3 + react 16 + redux + react-router 4.0 + ES6/7 + fetch + sass + svg
# 项目运行
#### 项目中使用ES6/7 等新属性，nodejs 要求 6.0 以上版本，使用node+express搭建本地服务返回交互数据，PM2做项目运行托管服务。
  npm install -g pm2  安装pm2

  git clone https://github.com/sk8ks/react.ele.me.git

  cd react.ele.me

  npm install

  npm start (本地运行后访问 http://localhost:3000)

# 在线DEMO


# 项目功能
项目功能基本参照官方版本
* 首页
    + 地里定位（后续优化用户体验）；
    + 搜索地址（目前只是模拟了部分功能，后续将优化改进）；
    + 地址附近商家列表；
* 商家分类筛选列表；
    + 商家商品列表（部分功能）；
    + 商家界面上的购物车功能；
* 个人中心
    + 手机登录功能（模拟短信发送）、密码登录功能；
    + JWT认证；
    + 账号退出；
* 订单（待完善）
# 更新日志
