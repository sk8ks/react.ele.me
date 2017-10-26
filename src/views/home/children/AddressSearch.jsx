import React, { PureComponent } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import cssModules from '../../../utils/cssModules';

import Header from '../../../components/header/Header';
import Curtain from '../../../components/curtain/Curtain';
// import ActivityIndicator from '../../../components/feedback/ActivityIndicator';
import {
    // geolocationAction,
    searchAddressNearbyAction,
} from '../../../redux/actionCreators';
import addressStyle from '../../../style/address.css';

// 地址输入框
class AddressInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        }
    }

    focus = event => {
        event.target.focus();
    }

    addressChange = event => {
        const value = event.target.value;
        this.setState(prevState => ({address: value}));
    }

    addressSearch = event => {
        const { address } = this.state;
        const { onAddressSearch } = this.props;
        if (event.keyCode === 13) {
            onAddressSearch(address);
        }
    }

    render () {
        const { address } = this.state;
        return (
            <section styleName="search-sect">
                <input type="search" placeholder="请输入地址" autoFocus="autofocus" onClick={this.focus} onKeyUp={this.addressSearch} value={address} onChange={this.addressChange} />
            </section>
        )
    }
}

class AddressList extends PureComponent {
    addressUpdate = (address) => {
        const { onAddressUpdate } = this.props;
        const coordinates = { latitude: address.latitude, longitude: address.longitude }
        onAddressUpdate(coordinates);
    }
    render () {
        const { addressListData } = this.props;
        const addressList = addressListData.map((address,index) => {
            return (
                <div styleName="item" onClick={() => this.addressUpdate(address)} key={index}>
                    <h6 styleName="title">{address.name}</h6>
                    <p styleName="info">{address.address}</p>
                </div>
            )
        });
        return (
            <section styleName="address-list">
                {addressList}
            </section>
        )
    }
}

// 订单组件
class Address extends PureComponent {
    static defaultProps = {
        status: !1,
        className: '',
        onExited: () => {},
    }
    static propTypes = {
        status: PropTypes.bool,      //
        className: PropTypes.string,
        onExited: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            addressListData: [],
        }
        // this.address = {}
        this.coordinates = {};
        this.isExitedCallback = !1;  // 退出后是否回调
    }

    searchAddressNearby = (address = '') => {
        if (!address) return;
        const { coordinates } = this.props;
        searchAddressNearbyAction(coordinates, {keyword: address})
            .then(addressListData => {
                if (addressListData) {
                    this.setState(prevState => ({addressListData: addressListData}));
                }
            })
            .catch(error => console.warn(error));
    }
    // 更新地理信息
    addressUpdate = coordinates => {
        const { onExited } = this.props;
        this.isExitedCallback = !!1;
        this.coordinates = coordinates;
        typeof onExited === 'function' && onExited();
    }
    // 退出后的回调
    exitedCallback = () => {
        if (this.isExitedCallback) {
            const { onAddressUpdate } = this.props;
            onAddressUpdate(this.coordinates);
        }
    }
    // 返回，无回调
    back = () => {
        const { onExited } = this.props;
        this.isExitedCallback = !1;
        typeof onExited === 'function' && onExited();
    }

    render () {
        const { wrapper, status, className } = this.props;
        const { addressListData } = this.state;
        return (
            <Curtain wrapper={wrapper} status={status} styleName={className} onExited={this.exitedCallback}>
                <Header mode={'back'} onBack={this.back} title="选择地址" />
                <AddressInput onAddressSearch={this.searchAddressNearby} />
                <AddressList addressListData={addressListData} onAddressUpdate={coordinates => this.addressUpdate(coordinates)} />
            </Curtain>
        )
    }
}
const mapStateToProps = state => {
    return {
        coordinates: state.coordinates,
        authentication: state.authentication
    }
};

AddressInput = cssModules(AddressInput, addressStyle);
AddressList = cssModules(AddressList, addressStyle);
Address = cssModules(Address, addressStyle);
export default connect(mapStateToProps)(Address);
