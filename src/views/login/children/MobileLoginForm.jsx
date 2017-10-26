import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues,
    getFormSyncErrors,
    getFormMeta,
    getFormSubmitErrors,
    isDirty,
    isPristine,
    isValid,
    isSubmitting,
    hasSubmitSucceeded,
    hasSubmitFailed
} from 'redux-form';
import {
    sendVcodeAction, loginAction
} from '../../../redux/actionCreators';
import Toast from '../../../components/feedback/Toast';
import Message from '../../../components/feedback/Message';
import { sleep } from '../../../utils/utils';
import { mobileValidator } from '../../../utils/validator';
import loginStyle from '../../../style/login.css';


// reduxForm 不兼容styleName属性，采用默认方式
const fieldStyle = loginStyle.field;
const submitStyle = loginStyle['btn-submit'];
const vcodeStyle = loginStyle.vcode;

// 手机号组件
class MobileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '1',
            mobileValidation: !1,
            vcodeSending: !1,    // 正在发送验证码
            vcodeSecond: 29,     // 发送验证码倒计时
            vcodeText: '获取验证码',      // 发送验证按钮文字
            vcode: '',
        }
    }
    componentDidMount = () => {}
    componentWillUnmount = () => {}

    sendValidationCode = () => {
        const { vcodeSending, vcodeText } = this.state;
        const { meta: { error }, actions: { sendVcodeAction } } = this.props;
        if (!error && !vcodeSending) {
            this.vcodeTimeId = setInterval(() => {
                const { vcodeSecond } = this.state;
                if (vcodeSecond == 0) {
                    clearInterval(this.vcodeTimeId);
                    this.setState((prevState) => ({
                        vcodeText: '重新发送',
                        vcodeSending: !1,
                        vcodeSecond: 29
                    }));
                    return;
                }
                this.setState((prevState) => ({
                    vcodeSecond: prevState.vcodeSecond-1,
                    vcodeText: '已发送('+ prevState.vcodeSecond +')'
                }));
            }, 1000);
            sendVcodeAction({
                captcha_code: '',
                mobile: this.state.mobile,
                scene: 'login',
                type: 'sms'
            }).then(res => {
                // 模拟手机短信
                sleep(1000).then(() => {
                    Message.info({title: '信息', message: res.message}, 5000);
                })
            })
        }
        this.setState(prevState => ({vcodeSending: !!1}));
    }
    render () {
        const { input: { name, onChange }, type, meta: { touched, error, warning }, inputFocus  } = this.props;
        const { vcodeSending, vcodeText } = this.state;
        const disabled =  (error || vcodeSending) ? 'disabled' : !1;
        return (
            <section className={fieldStyle}>
                <input name={name} type={type} maxLength="11" placeholder="手机号" onClick={inputFocus} onChange={onChange} />
                <button type="button" className={vcodeStyle}
                    onClick={this.sendValidationCode}
                    disabled={ disabled }>{vcodeText}</button>
            </section>
        )
    }
}
// 手机验证码
class MobileVcodeInput extends Component {
    render () {
        const { input: { name, onChange }, type, meta: { touched, error, warning }, inputFocus  } = this.props;
        return (
            <section className={fieldStyle}>
                <input name={name} type={type} maxLength="6" placeholder="验证码" name="vcode"
                    onClick={inputFocus} onChange={onChange} />
            </section>
        )
    }
}

// 手机登录表单
class MobileLoginForm extends Component {
    inputFocus = (evt) => {
        evt.target.focus();
    }
    mobileChange = (event, newValue, previousValue) => {
        this.setState({mobile: event.target.value});
    }

    smsLogin = values => {
        this.props.loginAction({
            password: values.vcode,
            account: values.mobile,
            type: 'sms'
        }).then(res => {
            if (res.login) {
                // ...
            } else {
                Toast.open({content: res.message, timeout: 300});
            }
        })
        .catch(error => {
            Toast.open({content: '请求失败，请检查您的网络', timeout: 300});
            console.error(error);
            // throw new SubmissionError(error);
        });
    }
    render () {
        const { show, error, handleSubmit, pristine, reset, submitting, submitSucceeded, submitFailed, sendVcodeAction } = this.props;
        const loginFormStyle = `${loginStyle['login-form']} ${show ? loginStyle.active : ''}`;
        return (
                <form className={loginFormStyle} onSubmit={handleSubmit(this.smsLogin)}>
                    <Field name="mobile" type="tel" component={MobileInput} onChange={this.mobileChange} inputFocus={this.inputFocus} actions={ {sendVcodeAction} } />
                    <Field name="vcode" type="tel" component={MobileVcodeInput} inputFocus={this.inputFocus} />

                    <section className={fieldStyle}>温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<a href="###" target="_blank">《用户服务协议》</a></section>
                    <button className={submitStyle} disabled={submitting}>{submitting ? '登录中...':'登录'}</button>
                </form>
        )
    }
}

const submitFail = (error, dispatch, submitError, props) => {
    if (error) {
        const content = error.mobile || error.vcode;
        Toast.open({content: content, timeout: 300})
    }
}

MobileLoginForm = reduxForm({
    form: 'MobileLoginForm',
    validate: mobileValidator,
    onSubmitFail: submitFail,
})(MobileLoginForm);

MobileLoginForm = connect(
    state => ({
        values: getFormValues('MobileLoginForm')(state),
        syncErrors: getFormSyncErrors('MobileLoginForm')(state),
        fields: getFormMeta('MobileLoginForm')(state),
        submitErrors: getFormSubmitErrors('MobileLoginForm')(state),
        // names: getFormNames()(state),
        dirty: isDirty('MobileLoginForm')(state),
        pristine: isPristine('MobileLoginForm')(state),
        valid: isValid('MobileLoginForm')(state),
        submitting: isSubmitting('MobileLoginForm')(state),
        submitSucceeded: hasSubmitSucceeded('MobileLoginForm')(state),
        submitFailed: hasSubmitFailed('MobileLoginForm')(state)
    }),
    dispatch => ({
        ...bindActionCreators({
            sendVcodeAction, loginAction
        }, dispatch)
    })
)(MobileLoginForm);

export default MobileLoginForm;
