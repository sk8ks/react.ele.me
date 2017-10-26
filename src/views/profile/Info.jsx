import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import cssModules from '../../utils/cssModules';
import {
    authenticatedAction,
    userInfoAction,
    logoutAction,
} from '../../redux/actionCreators';
import Header from '../../components/header/Header';
import infoStyle from '../../style/info.css';

// 账户信息
class Info extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: !!1
        }
    }

    componentDidMount = async () => {
        const { authenticatedAction, userInfoAction } = this.props;
        await authenticatedAction();
        const { authentication: { authenticated, userid } } = this.props;
        if (authenticated) {
            userInfoAction(userid);
        } else {
            this.setState({isLogin: !1})
        }
    }

    logout = async () => {
        const { logoutAction, authentication: { userid } } = this.props;
        await logoutAction({userid: userid});
        const { authentication: { authenticated } } = this.props;
        if (!authenticated) {
            this.setState({isLogin: !1})
        }
    }

    render() {
        const { userInfo: { avatar, username, mobile } } = this.props;
        const { isLogin } = this.state;

        if (!isLogin) {
            return (<Redirect to='/profile/' />);
        }

        return (
            <div className="page">
                <Header title="账户信息" />
                <div>
                    <ul styleName="list-box">
                        <li styleName="list-item">
                            <b>头像</b>
                            <span styleName="avator-box">
                                <input type="file" styleName="avator-input" accept="image/jpeg,image/jpg,image/png" />
                                <span styleName="avator">
                                    {avatar ? <img src={avatar} alt={username} /> : <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#avatar_default"></use></svg>}
                                </span>
                                <svg styleName="list-arrow"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use></svg>
                            </span>
                        </li>
                        <li styleName="list-item">
                            <b>用户名</b>
                            <span styleName="list-username">
                                {username}<svg styleName="list-arrow"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use></svg>
                            </span>
                        </li>
                    </ul>
                    <h2 styleName="list-title">账号绑定</h2>
                    <ul styleName="list-box">
                        <li styleName="list-item">
                            <span>
                                <svg styleName="icon-mobile"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#mobile"></use></svg>
                                <b>手机</b>
                            </span>
                            <span styleName="list-mobile">
                                {mobile}<svg styleName="list-arrow"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use></svg>
                            </span>
                        </li>
                    </ul>
                    <h2 styleName="list-title">安全设置</h2>
                    <ul styleName="list-box">
                        <li styleName="list-item">
                            <span>
                                <b>登录密码</b>
                            </span>
                            <span styleName="list-password">
                                未设置<svg styleName="list-arrow"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_right"></use></svg>
                            </span>
                        </li>
                    </ul>
                    <button type="button" styleName="btn-submit" onClick={this.logout}>退出登录</button>
                </div>
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
            userInfoAction,
            logoutAction,
        }, dispatch) };
}
Info = cssModules(Info, infoStyle);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Info));
