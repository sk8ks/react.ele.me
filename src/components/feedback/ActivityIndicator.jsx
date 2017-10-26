import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import cssModules from '../../utils/cssModules';
import UUID from 'uuidjs';
import loadingStyle from '../../style/loading.css';

// 活动指示器
class ActivityIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            status: !1,
        }
        this.id = 'activityIndicator_' + UUID.generate();
    }
    //
    componentDidMount = () => {}
    componentWillUnmount = () => {}

    open = () => {
        this.setState({status: !!1});
    }

    close = () => {
        // this.setState(prevState => ({status: !1}));
        typeof this.props.onClose === 'function' && (this.props.onClose());
        this.destroy();
    }

    destroy = () => {
        const parent = ActivityIndicator.parent;
        ReactDOM.unmountComponentAtNode(parent);
        document.body.removeChild(parent);
    }

    render () {
        return (
            <div className={loadingStyle['loading-wrap']}>
                <div className={loadingStyle['loading-box']}>
                    <div className={loadingStyle['loading-circle']}></div>
                </div>
            </div>
        )
    }
}


ActivityIndicator.open = props => {
    let parent = document.createElement('div');
    parent.className = loadingStyle['activity-indicator-box'];
    document.body.appendChild(parent);
    // const component = ReactDOM.render(<ActivityIndicator {...props} />, parent);
    ActivityIndicator.parent = parent;
    // ActivityIndicator.component = component;
    // component.open();
}
ActivityIndicator.close = () => {
    if (ActivityIndicator.parent) {
        // ActivityIndicator.component.close();
        ReactDOM.unmountComponentAtNode(ActivityIndicator.parent);
        document.body.removeChild(ActivityIndicator.parent);
    }
}


export default cssModules(ActivityIndicator, loadingStyle);
