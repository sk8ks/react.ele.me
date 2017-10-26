import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    withRouter
} from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Transition from 'react-transition-group/Transition';
import {
    filterRestaurantsAction
} from '../../redux/actionCreators';
import cssModules from '../../utils/cssModules';
import {
    serializeObject,
    array2Object
} from '../../utils/utils';
import Header from '../../components/header/Header';
import AsideFilter from './children/AsideFilter';
import RestaurantList from './children/RestaurantList';
import ActivityIndicator from '../../components/feedback/ActivityIndicator';
import restaurantFilterStyle from '../../style/restaurant.filter.css';

// 餐馆筛选
class RestaurantFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            restaurants: [],
        }
    }

    componentDidMount = () => {
        const { location: { hash } } = this.props;
        const hashArray = array2Object(serializeObject(hash.substr(1)));
        this.setState({title: hashArray.target_name});
    }

    filterRestaurants = query => {
        const { coordinates } = this.props;
        ActivityIndicator.open();
        filterRestaurantsAction({
            ...coordinates,
            ...query
        })
        .then(restaurants => {
            this.setState({restaurants: restaurants});
            ActivityIndicator.close();
        })
        .catch(error => {
            ActivityIndicator.close();
        })
    }

    render () {
        const { geoLocation } = this.props;
        const { title, restaurants } = this.state;

        return (
            <div styleName="page page-aside">
                <div styleName="header-aside">
                    <Header title={title} />
                    <AsideFilter onFilterRestaurants={this.filterRestaurants} />
                </div>

                <RestaurantList restaurants={restaurants} geo={geoLocation} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        coordinates: state.coordinates,
        geoLocation: state.geoLocation,
    }
};

RestaurantFilter = cssModules(RestaurantFilter, restaurantFilterStyle);
export default withRouter(connect(mapStateToProps)(RestaurantFilter));
