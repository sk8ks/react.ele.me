import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    addCartAction,
    reduceCartAction,
} from '../../../redux/actionCreators';
import { getScrollTop, getVisibleHeight } from '../../../utils/dom';
import cssModules from '../../../utils/cssModules';
import shopMenuStyle from '../../../style/shop.menu.css';


// 商家头部
class ShopMenu extends PureComponent {
    static propTypes = {
        shopMenu: PropTypes.array.isRequired,
    };

    static defaultProps = {
        shopMenu: [],
    };
    constructor (props) {
        super(props);
        this.anchors = [];
        this.position = [0];
        this.curPos = 0;
        this.state = {
            curPos: 0,
            // cart: []
        }
    }
    componentDidMount = () => {
        this.scrollWraper.addEventListener('scroll', this.attachScrollListener);
        setTimeout(() => {
            this.anchors.reduce((pos = 0, cur, index, arr) => {
                return this.position[index + 1] = pos + getVisibleHeight(cur);
            }, 0);
        }, 100);  // 此处在componentDidMount执行后未能获得DOM元素，因此人为延迟获取
    }
    componentWillUnmount = () => {
        this.scrollWraper.removeEventListener('scroll', this.attachScrollListener);
    }
    attachScrollListener = (event) => {
        const top = getScrollTop(this.scrollWraper);
        let curPos = this.position.findIndex((pos, index) => {
            return top < pos;
        });
        this.setState(prevState => ({curPos: curPos - 1}));
    }
    scrollTop = index => {
        this.scrollWraper.scrollTop = this.position[index];
    }
    reduce = food => {
        this.props.reduceCartAction(food);
        // this.setState(prevState => ({cart: prevState.cart.filter(item => food.item_id != item.item_id)}));
    }
    add = food => {
        let specfood = food.specfoods[0];
        // const food = { id,sku_id,item_id,quantity,name,price,original_price,packing_fee,stock,specs,attrs,weight,extra,
        // view_discount_price,view_original_price }
        if (specfood) {
            specfood = {
                restaurant_id: food.restaurant_id,
                category_id: food.category_id,
                id: specfood.food_id,
                item_id: specfood.item_id,
                sku_id: specfood.sku_id,
                name: specfood.name,
                price: specfood.price,
                original_price: specfood.original_price,
                packing_fee: specfood.packing_fee,
                stock: specfood.stock,
                specs: specfood.specs,
                attrs: food.attrs,
                weight: specfood.weight,
                extra: {},
                view_discount_price: specfood.price,
                view_original_price: specfood.price
            }
            this.props.addCartAction(specfood);
        }
    }
    render () {
        const { shopMenu, cart, shop } = this.props;
        const { curPos } = this.state;
        let menuList = [], categories = [];
        const shopCart = cart[shop.id] || [];

        shopMenu.forEach((menu, index_0) => {
            const menuItems = [];
            let categoryCartLength = 0;
            shopCart.reduce((pre, it) => {
                return categoryCartLength = menu.id === it.category_id ? pre + it.quantity : pre;
            }, 0);
            menu.foods.forEach((food, index_1) => {
                let selectedFood = {}
                shopCart.some(it => {
                    const isSelected = food.item_id === it.item_id;
                    if (isSelected) {
                        selectedFood = it;
                    }
                    return isSelected;
                });
                // (cart[food.restaurant_id] || []).reduce((pre, it) => {
                //     return amount = pre + it.quantity;
                // }, 0);
                const specfood = food.specfoods[0];
                menuItems.push(
                    <dd styleName="menu-item" key={food.item_id}>
                        <div styleName="menu-container">
                            <img styleName="logo" src={food.image_path} alt={food.name} />
                            <section styleName="info">
                                <p styleName="name"><strong>{food.name}</strong></p>
                                <p styleName="desc">{food.description}</p>
                                <p styleName="sales">
                                    <span>月售{food.month_sales}份</span>
                                    <span>好评率{food.rating_count}%</span>
                                </p>
                                <div styleName="sale-bar">
                                    <strong styleName="price">{specfood.price}</strong>
                                    <div styleName="add-shop">
                                        {selectedFood.quantity ? (
                                            <span styleName="reduce" onClick={() => this.reduce(food)}>
                                                <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart_minus"></use></svg>
                                            </span>
                                        ) : null}
                                        {selectedFood.quantity ? (<span styleName="amount">{selectedFood.quantity}</span>) : null}
                                        <span styleName="add" onClick={() => this.add(food)}>
                                            <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart_add"></use></svg>
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </dd>
                )
            });
            categories.push(
                <li key={index_0} className={curPos === index_0 ? shopMenuStyle.active : ''} onClick={() => this.scrollTop(index_0)}>
                    {/* 分类中选种商品数量 */}
                    {categoryCartLength ? (<span styleName="quantity">{categoryCartLength}</span>) : null}
                    <span styleName="name">{menu.name}</span>
                </li>
            );
            menuList.push(
                <dl styleName="menu" name={'menu'+index_0} key={index_0} ref={el => this.anchors.push(el)}>
                    <dt styleName="menu-title" >
                        <strong styleName="category-name">{menu.name}</strong>
                        <span styleName="category-desc">{menu.description}</span>
                    </dt>
                    {menuItems}
                </dl>
            );
        });
        return (
            <div styleName="shop-menu-wrap">
                <div styleName="container">
                    <main styleName="shop-menu">
                        <ul styleName="category">
                            {categories}
                        </ul>
                        <section styleName="menu-list" ref={el => this.scrollWraper = el}>
                            <div styleName="menu-scroller" ref={el => this.scroller = el}>
                                {menuList}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        );
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
        }, dispatch)
    };
}
ShopMenu = cssModules(ShopMenu, shopMenuStyle);
export default connect(mapStateToProps, mapDispatchToProps)(ShopMenu);
