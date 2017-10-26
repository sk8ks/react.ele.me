import React, { Component } from 'react';
import * as localStore from '../../service/localStore';

export const withLocalStore = (WrappedComponent) => {
    return class extends Component {
        componentWillReceiveProps(nextProps) {}
        render() {
            return <WrappedComponent {...this.props} {...localStore} />;
        }
    }
}
