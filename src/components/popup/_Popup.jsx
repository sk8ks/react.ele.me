import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import UUID from 'uuidjs';
import '../../style/toast.css';

let toastList = [];

class Popup extends Component {
    static defaultProps = {
        // status: !1,
        timeout: 300,
        duration: 3000,
        content: '',
    }

    static propTypes = {
        timeout: PropTypes.number,      //
        duration: PropTypes.number,     // 显示时间
        content: PropTypes.string,      // 显示的内容
    }

    constructor(props) {
        super(props);
        this.state = {
            status: !1
        }
        this.id = 'popup_' + UUID.generate();
    }

    componentWillUnmount = () => {
        this.clearTimer();
    }

    clearTimer () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    open = () => {
        this.setState(prevState => ({status: !!1}));
        // this.closeTimer = setTimeout(() => {
        //     this.close();
        // }, this.props.duration);
    }

    close = () => {
        this.setState(prevState => ({status: !1}));
        // this.clearTimer();
        typeof this.props.onClose == 'function' && (this.props.onClose());
        this.destroyTimer = setTimeout(() => {
            this.destroy();
            this.destroyTimer = null;
        }, this.props.timeout)

    }

    destroy = () => {
        let cur = null;
        popupList = popupList.filter(p => {
            if (p.id == this.id) {
                cur = p.component;
            }
            return p.id != this.id
        });
        if (cur) {
            ReactDOM.unmountComponentAtNode(cur);
            document.body.removeChild(cur);
        }
    }

    render () {
        const { timeout } = this.props;
        return (
            <Transition in={this.state.status} timeout={timeout}>
                {state => (<div className={`notice toast ${state}`}>{this.props.content}</div>)}
            </Transition>
        )
    }
}


Toast.open = props => {
    let toastBox = document.createElement('div');
    toastBox.className = 'toast-box';
    document.body.appendChild(toastBox);
    const toast = ReactDOM.render(<Toast {...props} />, toastBox);
    toastList.push({component: toastBox, id: toast.id});
    toast.open();
}

export default Toast;
