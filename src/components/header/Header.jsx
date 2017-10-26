import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import cssModules from '../../utils/cssModules';
import headerStyle from '../../style/header.css';

// 头部组件
class Header extends PureComponent {
    static defaultProps = {
        mode: 'history',
    }

    static propTypes = {
        mode: PropTypes.string,      //
    }

    back = () => {
        const { mode, onBack } = this.props;
        if (mode === 'history') {
            const { history } = this.props;
            history.go(-1);
        } else if (mode === 'back') {
            typeof onBack === 'function' && onBack();
        }
    }

    render () {
        return (
            <header styleName="header">
                <div styleName="head-wrapper">
                    <button styleName="btn-back" onClick={this.back}>
                        <svg><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_left"></use></svg>
                    </button>
                    <h1 styleName="title">{this.props.title}</h1>
                </div>
            </header>
        )
    }
}

export default withRouter(cssModules(Header, headerStyle));
