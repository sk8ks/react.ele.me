import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { noScroll, sleep } from '../../utils/utils';
import cssModules from '../../utils/cssModules';
import curtainStyle from '../../style/curtain.css';

class Curtain extends Component {
    static defaultProps = {
        status: !1,
        timeout: 0,
    }

    static propTypes = {
        status: PropTypes.bool,
        timeout: PropTypes.number,      //
    }

    constructor(props) {
        super(props);
        this.state = {
            curtainStatus: !1
        }
    }

    componentWillReceiveProps = nextProps => {
        // 禁止底层页面滚动
        noScroll(nextProps.status, nextProps.wrapper);
        const { status } = this.props;
        if (status != nextProps.status) {
            this.setState(prevState => ({curtainStatus: nextProps.status}));
        }
    }

    exited = () => {
        const { onExited } = this.props;
        if (typeof onExited === 'function') {
            // 延迟300MS执行，动画结束后立即执行
            sleep(300).then(() => onExited());
        }
    }

    render () {
        const { status, className, timeout, children, onExited } = this.props;
        const { curtainStatus } = this.state;
        return (
            <Transition in={curtainStatus} timeout={timeout} onExited={this.exited} mountOnEnter={true}>
                {state => (<div className={`${curtainStyle.curtain} ${className} ${curtainStyle[state]}`}>{children}</div>)}
            </Transition>
        )
    }
}

export default Curtain;
