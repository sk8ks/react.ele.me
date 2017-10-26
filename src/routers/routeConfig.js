import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import AsyncComponent from './AsyncComponent';

const Empty = AsyncComponent(() => import('../views/common/Empty'));
const Home = AsyncComponent(() => import('../views/home/Home'));
const RestaurantFilter = AsyncComponent(() => import('../views/home/RestaurantFilter'));
const Shop = AsyncComponent(() => import('../views/shop/Shop'));
const Profile = AsyncComponent(() => import('../views/profile/Profile'));
const Login = AsyncComponent(() => import('../views/login/Login'));
const Info = AsyncComponent(() => import('../views/profile/Info'));
const Order = AsyncComponent(() => import('../views/order/Order'));


const RouteConfig = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact strict />
            <Route path="/msite/" component={Home} exact strict />
            <Route path="/msite/food/" component={RestaurantFilter} strict />
            <Route path="/shop/" component={Shop} exact strict />
            <Route path="/discover/" component={Empty} exact strict />
            <Route path="/order/" component={Order} exact strict />
            <Route path="/profile/" component={Profile} exact strict />
            <Route path="/login/" component={Login} exact strict />
            <Route path="/profile/info/" component={Info} exact strict />
        </Switch>
    </Router>
);
export default RouteConfig;
