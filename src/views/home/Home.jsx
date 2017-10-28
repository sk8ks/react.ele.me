/**
 * 由于当前组件是应用入口，从优化角度来说，提升首屏加载尤为重要，后续更新将会使用ssr方式替代
 */
import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cssModules from '../../utils/cssModules';

import Entries from './children/Entries';
import RestaurantList from './children/RestaurantList';
import AddressSearch from './children/AddressSearch';
import Footer from '../../components/footer/Footer';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import ActivityIndicator from '../../components/feedback/ActivityIndicator';
import BackUp from '../../components/common/BackUp';

import { arrayShallowComparison } from '../../utils/utils';
import {
    authenticatedAction,
    coordinatesAction,
    geolocationAction,
    hotSearchWordsAction,
    entriesAction,
    fetchRestaurantListAction
} from '../../redux/actionCreators';
import { withLocalStore } from '../../components/common/withLocalStore';
import homeStyle from '../../style/home.css';
import loadingStyle from '../../style/loading.css';
import errorPlaceholder from "../../assets/4efda8c6bf4734d39faf86fe190c3gif.gif";

// 地理位置组件
class Address extends PureComponent {
    render() {
        const { address } = this.props;
        return (
            <span>{address ? address : '获取地址中...'}</span>
        );
    }
}
// 地理信息获取失败时显示
const GEOError = props => {
    return (
        <section className="geo-error">
            <img src={errorPlaceholder} alt="附近没有外卖商家"/>
            <h4>附近没有外卖商家</h4>
            <p>饿了么正在以光速来到你身边</p>
        </section>
    );
}
// 热搜词汇组件
class HotSearchWords extends PureComponent {
    render() {
        const { hotSearchWords } = this.props;
        const listItems = hotSearchWords.length ? hotSearchWords.map((item, index) => <a key={index}>{item.word}</a>) : [];
        return (
            <div className={homeStyle['hot-search']}>
                <div className={homeStyle['hot-search-bar']}>{listItems}</div>
            </div>
        )
    }
}
// 加载更多
const LoadMore = props => {
    return(
        <div className={loadingStyle['loading-bar']}>
            <svg >
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#loading.more"></use>
            </svg>
            <span>正在加载...</span>
        </div>
    );
}
// Home组件
class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            geoStatus: !!1,	//	地理位置状态
            entryLoadStatus: !1,	//	分类入口加载状态
            entries: [],    // 分类入口
            hotSearchWords: [],     // 热搜词
            restaurants: [],    // 餐馆列表
            addressStatus: !1,     // 地址面板显示状态
            hasMore: !1,    // 加载更多
            isLoading: !1,
        };
    }

    componentDidMount = () => {
        const { coordinates, authenticatedAction } = this.props;
        authenticatedAction();
        // 如有地理坐标则尝试地址更新
        if (coordinates.latitude && coordinates.longitude) {
            this.geoUpdate(coordinates);
        } else {    // 否则先获取地理坐标再尝试地址更新
            coordinatesAction(
                // 地理坐标获取成功
                res => this.geoUpdate(res.coords),
                // 地理坐标获取失败
                errorCode => this.setState({geoStatus: !1})
            );
        }
    }
    /**
     * [地理定位更新]
     * @param  {Object} [coords={}] [description]
     * @return {[type]}             [description]
     */
    geoUpdate = (coords = {}) => {
        // const { coordinates, getEntries, getHotSearchWords, getRestaurants } = this.props;
        // 如地理信息一致，且数据存在则读取缓存数据，否则请求新数据
        // if (coordinates.latitude === coords.latitude && coordinates.longitude === coords.longitude) {
        //     const restaurants = getRestaurants();
        //     const entries = getEntries();
        //     const hotSearchWords = getHotSearchWords();
        //     if (!restaurants.length) {
        //         this.addressUpdate(coords);
        //     } else {
        //         this.setState({entries, hotSearchWords, restaurants});
        //         this.setState({entryLoadStatus: !!1});
        //     }
        // } else {    // 如果地理信息不一致则重新获取地理信息并请求数据
        //     this.addressUpdate(coords);
        // }
        this.addressUpdate(coords);
    }

    // 地址搜索面板打开
    addressSearchOpen = () => {
        this.setState({addressStatus: !!1});
    }
    // 地址搜索面板关闭
    addressSearchClose = () => {
        this.setState({addressStatus: !1});
    }

    /**
     * [地址更新]
     * @param  {Object} [coords={}] [description]
     * @return {[type]}             [description]
     */
    addressUpdate = (coords = {}) => {
        const { geolocationAction, getEntries, getHotSearchWords, getRestaurants } = this.props;
        ActivityIndicator.open();
        geolocationAction(coords).then(geo => {
            if (geo) {
                this.setState({geoStatus: !!1});
                hotSearchWordsAction(coords)
                    .then(res => {
                        this.setState({hotSearchWords: getHotSearchWords()});
                    });
                entriesAction(coords)
                    .then(res => {
                        this.setState({entryLoadStatus: !!1, entries: getEntries()});
                    });
                fetchRestaurantListAction({...coords, offset: 0, limit: 20})
                    .then(res => {
                        const restaurants = getRestaurants();
                        this.setState({restaurants, hasMore: !!restaurants.length});
                        ActivityIndicator.close();
                    });
            }
        })
    }
    /**
     * 加载更多商家
     * @param  {Number} [pageNumber=0] [页码]
     * @return {[type]}                [description]
     */
    loadRestaurants = (pageNumber = 0) => {
        const { coordinates, getRestaurants } = this.props;
        this.setState({isLoading: !!1});
        fetchRestaurantListAction({...coordinates, offset: pageNumber*20, limit: 20})
            .then(res => {
                this.setState({restaurants: getRestaurants(), hasMore: !!res.length, isLoading: !1});
            });
    }
    render() {
        const { geoLocation } = this.props;
        const { geoStatus, addressStatus, hotSearchWords, entries, restaurants, hasMore, isLoading } = this.state;
        return (
            <div className="page" ref={el => this.wrapper = el}>
                <InfiniteScroll hasMore={hasMore} threshold={20} loadMore={this.loadRestaurants} isLoading={isLoading}>
    			{/* <div styleName="scroll-wrapper"> */}
					<header styleName="geo-header">
						<div styleName="get-address" onClick={this.addressSearchOpen}>
							<svg styleName="location" >
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#location"></use>
                            </svg>
                            {/* 地理信息 */}
							<Address address={geoLocation.name} />
							<svg styleName="arrow-down"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#arrow_down"></use></svg>
						</div>
					</header>

					<div styleName="head-search">
                        <div styleName="head-search-bar">
                            <input type="text" placeholder="搜索商家、商品" aria-label="搜索商家、商品" styleName="search-bar" />
                        </div>

					</div>
                    {/* 热门搜索词汇 */}
                    <HotSearchWords hotSearchWords={hotSearchWords} />

                    {/* 分类入口 */}
                    {geoStatus && <Entries loadStatus={this.state.entryLoadStatus} entries={entries} geohash={geoLocation.geohash} />}
                    {geoStatus && <h3 styleName="sect-title">推荐商家</h3>}
                    {/* 商家列表 */}
                    {geoStatus && <section styleName="restaurant-sect">
                        <RestaurantList restaurants={restaurants} geo={geoLocation}/>
                        {hasMore && <LoadMore />}
                    </section>}
                    {/* 定位失败 */}
                    {!geoStatus && <GEOError status={this.state.geoError}></GEOError>}

    			</InfiniteScroll>
                {/* 底部导航 */}
    			<Footer />
    			<BackUp />
                {/* 选地址 */}
                <AddressSearch
                    wrapper={this.wrapper}
                    status={addressStatus}
                    className="address-panel"
                    onExited={this.addressSearchClose}
                    onAddressUpdate={this.addressUpdate} />
        	</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        coordinates: state.coordinates,
        geoLocation: state.geoLocation,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            authenticatedAction,
            geolocationAction,
        }, dispatch)
    };
}
Home = cssModules(Home, homeStyle);
export default withLocalStore(withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)));
