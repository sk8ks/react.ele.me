
const mobileReg = /^1[3-9]\d{9}$/;
const mobileVcode = /^\d{6}$/;
// const required = value => (value ? undefined : 'Required');
export const mobileValidator = values => {
    const errors = {}
    if (!values.mobile) {
        errors.mobile = '请填写手机号';
    } else if (!mobileReg.test(values.mobile)) {
        errors.mobile = '请填写合法的手机号';
    }

    if (!values.vcode) {
        errors.vcode = '请填写验证码';
    } else if (!mobileVcode.test(values.vcode)) {
        errors.vcode = '验证码错误，请重新填写';
    }

    return errors;
}

export const accountValidator = values => {
    const errors = {}

    if (!values.accountName) {
        errors.accountName = '手机/邮箱/用户名 不能为空';
    }

    if (!values.password) {
        errors.password = '密码不能为空';
    }

    return errors;
}
