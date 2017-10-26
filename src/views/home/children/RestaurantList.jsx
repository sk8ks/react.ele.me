import React, { PureComponent } from 'react';
// import ReactSwipe from 'react-swipeable-views';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Activities from './restaurantChildren/Activities';
import cssModules from '../../../utils/cssModules';
import restaurantStyle from '../../../style/restaurant.css';

// 商家logo
const Logo = ({ isNew = false, name = '', imagePath = '' }) => {
    return (
        <div className={restaurantStyle['logo']}>
            {isNew ? <div><div className={restaurantStyle['new']}><span>新店</span></div><img alt={name} src={imagePath} /></div> : <img alt={name} src={imagePath} />}
        </div>
    );
}

// 商家支持项目
const Supports = ({ name = '', supports = [] }) => {
    const _supports = supports.map((support, i) => {
        return support.id !== 9 ? <i key={i} >{support.icon_name}</i> : null;
    });
    return (
        <section>
            <h3 className={restaurantStyle['name']}><span>{name}</span></h3>
            <div className={restaurantStyle['support']}>{_supports.length > 0 && _supports}</div>
        </section>
    )
}

// 评分
const Rating = ({ rating = 0, orderNum = 0, delivery = '' }) => {
    const countRating = {width: (rating/5)*100+'%'};
    return (
        <section className={restaurantStyle['rating-sec']}>
            <div className={restaurantStyle['rating-wrapper']}>
                <div className={restaurantStyle['rating']}>
                    <div className={restaurantStyle['rating-max']}>
                        {Array.from({length: 5}, (n, i) => (<svg key={i}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rating_star"></use></svg>))}
                    </div>
                    <div className={restaurantStyle['rating-count']} style={countRating}>
                        {Array.from({length: 5}, (n, i) => (<svg key={i}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rating_star"></use></svg>))}
                    </div>
                </div>
                <span className={restaurantStyle['rating-score']}>{rating}</span>
                <span className={restaurantStyle['sales']}>月售{orderNum}单</span>
            </div>
            <div className={restaurantStyle['delivery']}>
                {delivery && <span className={restaurantStyle['icon-delivery']}>{delivery.text}</span>}
            </div>
        </section>
    )
}

// 配送
const Distribution = ({
    minOrderAmount = 0,
    deliveryFee = 0,
    averageCost = null,
    orderLeadTime = 0,
    distance = 0
}) => {
    const _distance = distance < 1000 ? distance + 'm' : (distance/1000).toFixed(2) + 'km';
    return (
        <section className={restaurantStyle['distribution-sect']}>
            <div className={restaurantStyle['delivery']}>
                <span>¥{minOrderAmount}起送</span>
                <span>配送费¥{deliveryFee}</span>
                {averageCost && <span>{averageCost}</span>}
            </div>
            <div className={restaurantStyle['dis-time']}>
                <span className={restaurantStyle['distance']}>{_distance}</span> <span className={restaurantStyle['time']}>{orderLeadTime}分钟</span>
            </div>
        </section>
    )
}
// 商家列表组件
class RestaurantList extends PureComponent {
    static propTypes = {
        restaurants: PropTypes.array,
        geo: PropTypes.object,
    };
    static defaultProps = {
        restaurants: [],
        geo: {}
    };
    linkTo = (link) => {
        const { history } = this.props;
        history.push(link)
    }
    render () {
        const { restaurants, geo } = this.props;
        const restaurantList = restaurants.map((restaurant, index_0) => {
            const {id, is_new, name, image_path, supports, rating, recent_order_num, delivery_mode, float_minimum_order_amount, distance, delivery_fee, average_cost, order_lead_time, activities} = restaurant;
            const link = '/shop/#geohash='+geo.geohash+'&id='+id+'&s_type=0';
            return (
                <div to={link} styleName="item" key={index_0} onClick={() => this.linkTo(link)} >
                    <Logo isNew={is_new} name={name} imagePath={image_path} />
                    <div styleName="info">
                        <Supports name={name} supports={supports} />
                        <Rating rating={rating} orderNum={recent_order_num} delivery={delivery_mode} />
                        <Distribution minOrderAmount={float_minimum_order_amount} distance={distance} deliveryFee={delivery_fee} averageCost={average_cost} orderLeadTime={order_lead_time} />
                        <Activities activities={activities} />
                    </div>
                </div>
            )
        });
        return (
            <section styleName="restaurant-list">
                {restaurantList}
            </section>
        )
    }
}

RestaurantList = cssModules(RestaurantList, restaurantStyle);
export default withRouter(RestaurantList);
