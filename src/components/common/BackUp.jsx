import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
// import cssModules from '../../utils/cssModules';

const getScrollTop = (element) => {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }
    return element.scrollTop;
};

class BackUp extends PureComponent {
    static propTypes = {
        threshold: PropTypes.number,
    };

    static defaultProps = {
        threshold: 260,
    };
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
            status: !1
        }
    }
    componentDidMount = () => {
        window.addEventListener('scroll', this.attachScrollListener);
    }
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.attachScrollListener);
    }
    attachScrollListener = () => {
        const { threshold } = this.props;
        const top = getScrollTop(window);
        if (top >= Number(threshold)) {
            this.setState({display: '', status: !!1});
        } else {
            this.setState({status: !1});
        }
    }
    detachScrollListener = () => {}
    exited = () => setTimeout(() => this.setState({display: 'none'}), 300);
    backToTop = () => document.documentElement.scrollTop = 0;
    render () {
        return (
            <Transition in={this.state.status} timeout={0} onExited={this.exited}>
                {state => (
                    <div className={`back-up ${state}` } style={{display: this.state.display}} onClick={this.backToTop}>
                        <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#back_top"></use></svg>
                    </div>
                )}
            </Transition>
        )
    }
}

export default BackUp;
