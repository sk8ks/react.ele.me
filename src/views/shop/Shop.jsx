import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
    authenticatedAction,
    fetchShopAction,
    fetchShopMenuAction,
} from '../../redux/actionCreators';
import { serializeObject, array2Object } from '../../utils/utils';
// import { getScrollTop, getVisibleHeight } from '../../utils/dom';
import ShopMenu from './children/ShopMenu';
import ShopFooter from './children/ShopFooter';
import cssModules from '../../utils/cssModules';
import shopStyle from '../../style/shop.css';

// 商家头部
class ShopHeader extends PureComponent {
    static propTypes = {
        shop: PropTypes.object.isRequired,
    };

    static defaultProps = {
        shop: {},
    };
    back = () => {
        const { history } = this.props;
        history.go(-1);
    }
    render () {
        const { shop: {
            image_path, name, order_lead_time, piecewise_agent_fee, activities
        }, element } = this.props;

        return (
            <div styleName="shop-header" ref={element}>
                <div styleName="shop-bg" >
                    <img src={image_path} alt="" style={{
                        backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient: (45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%), cursor: zoom-in'
                    }}/>
                </div>
                <nav styleName="shop-header-nav">
                    <a styleName="shop-header-navBtn" onClick={this.back}>
                        <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_left"></use></svg>
                    </a>
                </nav>
                <div styleName="shop-header-bd">
                    <img styleName="logo" src="https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt={name} />
                    <div styleName="content">
                        <h2 styleName="shop-name">{name}</h2>
                        {piecewise_agent_fee && (
                            <p styleName="delivery">
                                <span>商家配送</span>
                                <span>{order_lead_time}分钟送达</span>
                                {piecewise_agent_fee && (<span>{piecewise_agent_fee.tips}</span>)}
                            </p>
                        )}
                        <div styleName="notice">
                            <span>公告：</span> <span>欢迎光临，用餐高峰期请提前下单，谢谢。</span>
                        </div>
                    </div>
                </div>
                <div styleName="activities">
                    {activities && (
                        <div styleName="container">
                            <i styleName="icon-new"><span>{activities[0].icon_name}</span></i>
                            <span styleName="desc">{activities[0].description}</span>
                        </div>)}
                </div>
            </div>
        )
    }
}

class Shop extends Component {
    // static propTypes = {
    //     match: PropTypes.object.isRequired,
    //     location: PropTypes.object.isRequired,
    //     history: PropTypes.object.isRequired
    // }
    constructor (props) {
        super(props);
        this.state = {
            shop: {},
            shopMenu: [],
            shopMenuHeight: 0,
            cartList: [],
            cartAmount: 0,
        }
    }
    componentDidMount = async () => {
        const { location: { hash } } = this.props;
        const { id = 0 } = array2Object(serializeObject(hash.substr(1)));
        fetchShopAction(id)
            .then(shop => this.setState({shop: shop}))
            .catch(error => console.error(error));
        fetchShopMenuAction(id)
            .then(menu => this.setState({shopMenu: menu}))
            .catch(error => console.error(error));
    }
    render () {
        const { history } = this.props;
        const { shop, shopMenu } = this.state;
        // const activities = shop.activities;
        return (
            <div styleName="shop-page">
                <ShopHeader shop={shop} history={history} element={el => this.header = el} />
                <ul styleName="shop-tabs" ref={el => this.tabs = el}>
                    <li styleName="tab">商品</li>
                    <li styleName="tab">评价</li>
                    <li styleName="tab">店铺</li>
                </ul>
                <ShopMenu shop={shop} shopMenu={shopMenu}/>
                <ShopFooter shop={shop} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        coordinates: state.coordinates,
        geoLocation: state.geoLocation,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            authenticatedAction,
            // fetchShopAction,
            // fetchShopMenuAction,
        }, dispatch)
    };
}
ShopHeader = cssModules(ShopHeader, shopStyle);
Shop = cssModules(Shop, shopStyle);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shop));
