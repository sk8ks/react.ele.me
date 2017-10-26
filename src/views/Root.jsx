import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import RouteConfig from '../routers/routeConfig';

class Root extends Component {
    render () {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <RouteConfig />
            </Provider>
        )
    }
}


Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
