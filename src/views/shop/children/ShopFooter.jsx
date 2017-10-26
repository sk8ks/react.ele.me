import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import {
    addCartAction,
    reduceCartAction,
    clearCartAction,
} from '../../../redux/actionCreators';
import { getScrollTop, getVisibleHeight } from '../../../utils/dom';
import cssModules from '../../../utils/cssModules';
import shopFooterStyle from '../../../style/shop.footer.css';


class ShopFooter extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            cartStatus: !1,
            cartStyleDisplay: '',
            submitText: '¥0起送',
        }
    }
    componentDidMount = () => {}
    cartShow = () => {
        this.setState(prevState => ({cartStatus: !!1, cartStyleDisplay: ''}))
    }
    cartHide = () => {
        this.setState(prevState => ({cartStatus: !1}));
        setTimeout(() => {
            this.setState(prevState => ({cartStyleDisplay: 'none'}));
        }, 300);
    }
    cartToggle = () => {
        this.state.cartStatus ? this.cartHide() : this.cartShow();
    }
    reduce = food => {
        this.props.reduceCartAction(food);
    }
    add = food => {
        this.props.addCartAction(food);
    }
    clearCart = restaurantId => {
        this.props.clearCartAction(restaurantId);
    }
    render () {
        const { cart, shop: { activities, piecewise_agent_fee, id } } = this.props;
        const { cartStatus, cartStyleDisplay, submitText } = this.state;
        let totalAmount = {total: 0, amount: 0};
        const fee = piecewise_agent_fee && piecewise_agent_fee.extra_fee || 0;
        const shopCart = cart[id] || [];
        // 计算当前商铺选择的商品总数，总价
        shopCart.reduce((totalAmount, item, index) => {
            totalAmount.total += (item.price*item.quantity);
            totalAmount.amount += item.quantity;
            return totalAmount;
        }, totalAmount);

        let cartList = [];
        let foods = {};
        // shopCart.forEach((food, index) => {
        //     let prev = foods[food.item_id] || {};
        //     foods[food.item_id] = {...prev, item: food, length: (prev.length || 0) + 1}
        // });
        shopCart.forEach((item, index) => {
            cartList.push(
                <li styleName="cart-item" key={item.id}>
                    <div styleName="info-bar">
                        <p styleName="name">{item.name}</p>
                        <p styleName="desc">{item.specs[0].value}</p>
                    </div>
                    <div styleName="sale-bar">
                        <strong styleName="price">{item.price*item.quantity}</strong>
                    </div>
                    <div styleName="cart-bar">
                        <span styleName="reduce" onClick={() => this.reduce(item)}>
                            <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart_minus"></use></svg>
                        </span>
                        <span styleName="amount">{item.quantity}</span>
                        <span styleName="add" onClick={() => this.add(item)}>
                            <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart_add"></use></svg>
                        </span>

                    </div>
                </li>
            )
        });

        return (
            <footer styleName="shop-cart">
                <Transition in={cartStatus} timeout={0} onExited={this.cartHide} mountOnEnter={true}>
                    {state => (<div className={`${shopFooterStyle['shop-mask']} ${shopFooterStyle[state]}`} style={{display: cartStyleDisplay}} onClick={this.cartHide}></div>)}
                </Transition>
                <div styleName="cart-wraper">
                    {activities && (<div styleName="cart-discount">{activities[0].tips}</div>)}
                    <div className={`${shopFooterStyle['cart-list-wraper']} ${cartStatus ? shopFooterStyle['active']:''}`}>
                        <div styleName="cart-header">
                            <span styleName="title">已选商品</span>
                            <a styleName="clear" onClick={() => this.clearCart(id)}>清空</a>
                        </div>
                        <div styleName="cart-list-scroller">
                            <ul styleName="cart-list">
                                {cartList}
                            </ul>
                        </div>
                    </div>
                </div>
                <div styleName="cart-footer">
                    <span styleName={`cart-btn ${totalAmount.amount ? 'active' : ''}`} onClick={this.cartToggle}>
                        {totalAmount.amount ? (<em data-amount={totalAmount.amount}></em>) : null}
                    </span>
                    <div styleName="cart-info">
                        <p styleName="total">¥{totalAmount.total}</p>
                        <p styleName="delivery">配送费¥9</p>
                    </div>
                    {totalAmount.amount ? (<a styleName="cart-submit">去结算</a>) : (<span styleName="cart-submit disabled">￥{fee}起送</span>) }
                </div>
            </footer>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            addCartAction,
            reduceCartAction,
            clearCartAction,
        }, dispatch)
    };
}
ShopFooter = cssModules(ShopFooter, shopFooterStyle);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopFooter));
