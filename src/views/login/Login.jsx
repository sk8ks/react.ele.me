import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import cssModules from '../../utils/cssModules';
import { sendVcodeAction } from '../../redux/actionCreators';
import MobileLoginForm from './children/MobileLoginForm';
import AccountLoginForm from './children/AccountLoginForm';
import loginStyle from '../../style/login.css';


// 登录组件
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loginForm: 'MobileLoginForm',   // 登录方式
        }
    }

    loginFormChange = formName => {
        this.setState({loginForm: formName});
    }

    sendValidationCode = () => {
        this.sendVcodeAction();
    }

    render () {
        const { location, authentication: { authenticated } } = this.props;
        const { from } = location.state || { from: { pathname: '/profile/' } };
        const { loginForm } = this.state;

        if (authenticated) {
            return (<Redirect to={from} />);
        }

        return (
            <div styleName="login-wrapper">
                <div styleName="login-box">
                    <div styleName="login-header">
                        <svg styleName="logo">
                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#login_logo"></use>
                        </svg>
                        <div styleName="tab-bar">
                            <span styleName={loginForm === 'MobileLoginForm' && 'active'} onClick={() => this.loginFormChange('MobileLoginForm')} >短信登录</span>
                            <span styleName={loginForm === 'AccountLoginForm' && 'active'} onClick={() => this.loginFormChange('AccountLoginForm')}>密码登录</span>
                        </div>
                    </div>
                    <div styleName="login-body">
                        <MobileLoginForm show={loginForm === 'MobileLoginForm'} />
                        <AccountLoginForm show={loginForm === 'AccountLoginForm'} />
                    </div>
                </div>
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
            sendVcodeAction,
        }, dispatch) };
}

Login = cssModules(Login, loginStyle);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
