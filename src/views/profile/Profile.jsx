import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import cssModules from '../../utils/cssModules';
import {
    authenticatedAction,
    userInfoAction,
} from '../../redux/actionCreators';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import profileStyle from '../../style/profile.css';

// 个人主页
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileLink: '',
            username: '登录/注册',
            mobile: '登录后享受更多特权',
        }
    }
    //
    componentDidMount = async () => {
        const { authenticatedAction, userInfoAction } = this.props;
        await authenticatedAction();
        const { authentication: { authenticated, userid } } = this.props;
        if (authenticated) {
            await userInfoAction(userid);
            const { userInfo } = this.props;
            userInfo && this.setState(prevState => ({
                profileLink: '/profile/info/',
                username: userInfo.username,
                mobile: userInfo.mobile
            }));
        } else {
            this.setState(prevState => ({profileLink: '/login/'}));
        }
    }

    render() {
        const { userInfo, userInfo: { avatar, gift_amount, point } } = this.props;
        const { username, mobile } = this.state;
        return (
            <div className="page">
                <Header title="我的" />
                <section>
                    <Link to={this.state.profileLink}>
                        <div styleName="profile-box">
                            <span styleName="profile-avatar">
                                {avatar ? <img src={avatar} alt={username} /> : <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#avatar_default"></use></svg>}
                            </span>
                            <div styleName="profile-login">
                                {/* <p styleName="t">{{username}}</p> */}
                                <p styleName="t">{username}</p>
                                <p styleName="s">
                                    <svg fill="#fff">
                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#mobile"></use>
                                    </svg>
                                    <span>{mobile}</span>
                                </p>
                            </div>
                            <span styleName="profile-arrow">
                                <svg fill="#fff"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use></svg>
                            </span>
                        </div>
                    </Link>
                </section>

                <div styleName="profile-info">
                    <Link to="/benefit/" styleName="benefit">
                        <p styleName="count">
                            {userInfo.hasOwnProperty('gift_amount') ?
                                <span styleName="benefit-amount"><em>{gift_amount}</em>个</span> :
                                <svg fill="#ff5f3e">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#luckybag"></use>
                                </svg>}
                            {/* <span styleName="benefit-amount" v-else><em>{{gift}}</em>个</span> */}

                        </p>
                        <p styleName="">优惠</p>
                    </Link>
                    <Link to="/points/" styleName="points">
                        <p styleName="count">
                            {userInfo.hasOwnProperty('point') ?
                                <span styleName="point-amount"><em>{point}</em>分</span> :
                                <svg fill="#6ac20b">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#coins"></use>
                                </svg>}
                            {/* <span styleName="point-amount" v-else><em>{{point}}</em>分</span> */}

                        </p>
                        <p styleName="">积分</p>
                    </Link>
                </div>

                <section styleName="profile-center">
                    <Link to="/order/" styleName="order">
                        <aside styleName="icon-order">
                            <svg fill="#4aa5f0">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#order"></use>
                            </svg>
                        </aside>
                        <div styleName="cont">我的订单
                            <span styleName="arrow">
                                <svg>
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use>
                                </svg>
                            </span>
                        </div>
                    </Link>
                    <Link to="/gift/" styleName="point">
                        <aside styleName="icon-point">
                            <svg fill="#fc7b53">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#point"></use>
                            </svg>
                        </aside>
                        <div styleName="cont">积分商城
                            <span styleName="arrow">
                                <svg>
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use>
                                </svg>
                            </span>
                        </div>
                    </Link>
                    <Link to="/vipcard/" styleName="vip">
                        <aside styleName="icon-vip">
                            <svg fill="#ffc636">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#vip"></use>
                            </svg>
                        </aside>
                        <div styleName="cont">饿了么会员卡
                            <span styleName="arrow">
                                <svg>
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use>
                                </svg>
                            </span>
                        </div>
                    </Link>
                </section>

                <section styleName="profile-center">
                    <Link to="/service/" styleName="service">
                        <aside styleName="icon-service">
                            <svg fill="#4aa5f0">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#service"></use>
                            </svg>
                        </aside>
                        <div styleName="cont">服务中心
                            <span styleName="arrow">
                                <svg>
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use>
                                </svg>
                            </span>
                        </div>
                    </Link>
                    <Link to="/download/" styleName="download">
                        <aside styleName="icon-download">
                            <svg fill="#fc7b53">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#download"></use>
                            </svg>
                        </aside>
                        <div styleName="cont">下载饿了么APP
                            <span styleName="arrow">
                                <svg>
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use>
                                </svg>
                            </span>
                        </div>
                    </Link>
                </section>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        userInfo: state.userInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            authenticatedAction,
            userInfoAction
        }, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(cssModules(Profile, profileStyle)));
