import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import UUID from 'uuidjs';
import toastStyle from '../../style/toast.css';

let toastList = [];
// toast组件
class Toast extends PureComponent {
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
        this.id = 'toast_' + UUID.generate();console.log(toastStyle)
    }
    //
    componentDidMount = () => {}
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
        this.closeTimer = setTimeout(() => {
            this.close();
        }, this.props.duration);
    }

    close = () => {
        this.setState(prevState => ({status: !1}));
        this.clearTimer();
        typeof this.props.onClose == 'function' && (this.props.onClose());
        this.destroyTimer = setTimeout(() => {
            this.destroy();
            this.destroyTimer = null;
        }, this.props.timeout)

    }

    destroy = () => {
        let curToast = null;
        toastList = toastList.filter(t => {
            if (t.id == this.id) {
                curToast = t.component;
            }
            return t.id != this.id
        });
        if (curToast) {
            ReactDOM.unmountComponentAtNode(curToast);
            document.body.removeChild(curToast);
        }
    }

    render () {
        const { timeout } = this.props;

        return (
            <Transition in={this.state.status} timeout={timeout}>
                {state => {
                    const className = `${toastStyle.toast} ${toastStyle[state]}`;
                    return (<div className={className}>{this.props.content}</div>)
                }}
            </Transition>
        )
    }
}


Toast.open = props => {
    let toastBox = document.createElement('div');
    // toastBox.className = toastStyle['toast-box'];
    document.body.appendChild(toastBox);
    const toast = ReactDOM.render(<Toast {...props} />, toastBox);
    toastList.push({component: toastBox, id: toast.id});
    toast.open();
}

export default Toast;
