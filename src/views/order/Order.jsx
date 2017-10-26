import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Link,
    withRouter
} from 'react-router-dom';
import cssModules from '../../utils/cssModules';
import { errImg, noDataImg } from '../../utils/env';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {
    authenticatedAction
} from '../../redux/actionCreators';
// import { icon_arrow_right } from '../../components/common/svg.js';
import orderStyle from '../../style/order.css';


// 订单组件
class Order extends PureComponent {
    componentDidMount = () => {
        const { authenticatedAction } = this.props;
        authenticatedAction();
    }
    render () {
        const { authentication: { authenticated } } = this.props;
        return (
            <div className="page">
                <Header title="订单" />
                <section>
                    {authenticated ? (<div styleName="no-data-wrapper no-data">
                        <img src={noDataImg} alt="近三个月无外卖订单记录" />
                        <p>近三个月无外卖订单记录</p>
                        <section>
                            <span styleName="history-btn">
                                查看三个月前的外卖订单
                                <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use></svg>
                            </span>
                        </section>
                    </div>) : (<div styleName="no-data-wrapper no-data" >
                        <img src={errImg} alt="请登录后查看外卖订单" />
                        <p>请登录后查看外卖订单</p>
                        <Link to="/login/" styleName="login-btn">立即登录</Link>
                    </div>)}

                </section>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            authenticatedAction
        }, dispatch) };
}

Order = cssModules(Order, orderStyle);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
