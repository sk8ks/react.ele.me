import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, propTypes, SubmissionError, getFormValues,
    getFormSyncErrors,
    getFormMeta,
    getFormSubmitErrors,
    getFormNames,
    isDirty,
    isPristine,
    isValid,
    isSubmitting,
    hasSubmitSucceeded,
    hasSubmitFailed
} from 'redux-form';
import { loginAction } from '../../../redux/actionCreators';
import Toast from '../../../components/feedback/Toast';
import { accountValidator } from '../../../utils/validator';
import loginStyle from '../../../style/login.css';

// reduxForm 不兼容styleName属性，采用默认方式
const fieldStyle = loginStyle.field;
const submitStyle = loginStyle['btn-submit'];
const switchBtnStyle = loginStyle['switch-btn'];

// 帐号组件
class AccountInput extends Component {
    render () {
        const { input: { name, onChange }, type, meta: { touched, error, warning }, inputFocus  } = this.props;
        return (
            <section className={fieldStyle}>
                <input name={name} placeholder="手机/邮箱/用户名" type={type} onClick={inputFocus} onChange={onChange} />
            </section>
        )
    }
}
// 密码组件
class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchType: 'password',
            switchText: '...'
        }
    }
    switchPasswordText = () => {
        const { switchType, switchText } = this.state;
        if (switchType == 'password') {
            this.setState(prevState => ({switchType: 'text', switchText: 'abc'}));
        } else {
            this.setState(prevState => ({switchType: 'password', switchText: '...'}))
        }
    }
    render () {
        const { input: { name, onChange }, type, meta: { touched, error, warning }, inputFocus } = this.props;
        const { switchType, switchText } = this.state;
        const switchStyle = `${loginStyle.switch} ${switchType == 'password' ? loginStyle.off : loginStyle.on}`;
        return (
            <section className={fieldStyle}>
                <input name={name} type={switchType} placeholder="密码" onClick={inputFocus} onChange={onChange} />
                <div className={switchStyle} onClick={this.switchPasswordText}>
                    <i className={switchBtnStyle}></i>{switchText}
                </div>
            </section>
        )
    }
}

// 手机登录表单
class AccountLoginForm extends Component {
    inputFocus = (evt) => {
        evt.target.focus();
    }

    accountLogin = values => {
        this.props.actions.loginAction({
            password: values.password,
            account: values.accountName,
            type: 'account'
        }).then(res => {
            if (res.login) {
                // ...
            } else {
                Toast.open({content: res.message, timeout: 300});
            }
        })
        .catch(error => {
            throw new SubmissionError(error);
            Toast.open({content: '请求失败，请检查您的网络', timeout: 300});
        });
    }
    render () {
        const { show, error, handleSubmit, pristine, reset, submitting, submitSucceeded, submitFailed, actions: { sendVcodeAction } } = this.props;
        const loginFormStyle = `${loginStyle['login-form']} ${show ? loginStyle.active : ''}`;
        return (
            <form className={loginFormStyle} onSubmit={handleSubmit(this.accountLogin)}>
                <Field name="accountName" type="text" component={AccountInput} inputFocus={this.inputFocus} />
                <Field name="password" component={PasswordInput} inputFocus={this.inputFocus} />
                <button className={submitStyle} disabled={submitting}>登录</button>
            </form>
        )
    }
}
const submitFail = (error, dispatch, submitError, props) => {
    if (error) {
        const content = error.accountName || error.password;
        Toast.open({content: content, timeout: 300})
    }
}

AccountLoginForm = reduxForm({
    form: 'AccountLoginForm',
    validate: accountValidator,
    onSubmitFail: submitFail,
})(AccountLoginForm);

AccountLoginForm = connect(
    state => ({
        values: getFormValues('AccountLoginForm')(state),
        syncErrors: getFormSyncErrors('AccountLoginForm')(state),
        fields: getFormMeta('AccountLoginForm')(state),
        submitErrors: getFormSubmitErrors('AccountLoginForm')(state),
        // names: getFormNames()(state),
        dirty: isDirty('AccountLoginForm')(state),
        pristine: isPristine('AccountLoginForm')(state),
        valid: isValid('AccountLoginForm')(state),
        submitting: isSubmitting('AccountLoginForm')(state),
        submitSucceeded: hasSubmitSucceeded('AccountLoginForm')(state),
        submitFailed: hasSubmitFailed('AccountLoginForm')(state)
    }),
    dispatch => ({
        actions: bindActionCreators({
            loginAction
        }, dispatch)
    })
)(AccountLoginForm);

export default AccountLoginForm;
