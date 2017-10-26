// Notice是Toast最底层组件
// 每个黑色的小框框其实都是一个Notice
// Notice核心就是组件初始化的时候 生成一个定时器
// 根据输入的时间 加载一个动画 然后执行输入的回调
// Notice的显示和隐藏收到父组件Notification的绝对控制
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import cssModules from '../../utils/cssModules';
import UUID from 'uuidjs';
import noticeStyle from '../../style/notice.css';


class Notice extends Component {
    static defaultProps = {
        // status: !1,
        timeout: 500,
        duration: 3000,
        content: {
            title: '',
            message: ''
        },
    }
    static propTypes = {
        // status: PropTypes.boolean,  // 显示开关
        type: PropTypes.string, // notice类型
        timeout: PropTypes.number, // 显示时间
        duration: PropTypes.number,
        content: PropTypes.object, // 显示的内容
        onClose: PropTypes.func // 显示结束回调
    };
    constructor (props) {
        super(props);
        this.state = {
            status: !1,
            notices: [],
            shouldClose: !1,    // 是否开启关闭动画
        }
    }
    componentDidMount = () => {
        this.open();
    }
    componentWillUnmount = () => {
        // 当有意外关闭的时候 清掉定时器
        this.clearTimer();
    }
    clearTimer = () => {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    open = () => {
        this.setState(prevState => ({status: !!1}));
        this.closeTimer = setTimeout(() => {
            this.close();
        }, this.props.duration);
    }

    close = () => {
        const { onClose } = this.props;
        this.setState(prevState => ({status: !1}));

        this.destroyTimer = setTimeout(() => {
            this.destroyTimer = null;
            typeof onClose == 'function' && (onClose());
        }, this.props.timeout)
    }

    // destroy = () => {
    //     const el = this.el;
    //     if (el) {
    //         ReactDOM.unmountComponentAtNode(el);
    //         document.body.removeChild(el);
    //     }
    // }
    render = () => {
        const { content: { title, message }, timeout } = this.props;
        const { status, shouldClose } = this.state;
        // ${status ? 'active' : ''}
        return (
            <Transition in={status} timeout={timeout}>
                {state => {
                    return (
                        <div className={`${noticeStyle.message} ${noticeStyle[state]}`}>
                            <h2 className={noticeStyle.hd}>{title}</h2>
                            <div className={noticeStyle.bd}>{message}</div>
                        </div>
                    )
                }}
            </Transition>


        )
    }
}

export default Notice;
