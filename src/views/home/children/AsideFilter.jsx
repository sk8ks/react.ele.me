import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cssModules from '../../../utils/cssModules';
import { filterSort, filterDelivery, filterSupport } from '../../../service/filter'
import { fetchCategoryAction } from '../../../redux/actionCreators';
import { noScroll } from '../../../utils/utils';
import asideFilterStyle from '../../../style/aside.filter.css';

const getAsideNavStyle = (filterType, curType) => `${asideFilterStyle.nav} ${filterType === curType ? asideFilterStyle.active : ''}`;
// const getAsideSvgStyle = (filterType, curType) => `${filterType === curType ? asideFilterStyle.open : ''}`;

class FilterHeader extends PureComponent {
    filterChange = (filterType) => {
        const { onFilterChange, onGetCategory } = this.props;
        onFilterChange(filterType);
        filterType === 1 && onGetCategory();
    }
    render () {
        const { filterType, categoryName, sortName } = this.props;
        const categoryNavStyle = getAsideNavStyle(1, filterType);
        const sortNavStyle = getAsideNavStyle(2, filterType);
        const filterNavStyle = getAsideNavStyle(3, filterType);
        return (
            <div styleName="filter-header">
                <a className={categoryNavStyle} onClick={() => this.filterChange(1)}>
                    <span>{categoryName}</span>
                    <svg className={categoryNavStyle}>
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#activity_more"></use>
                    </svg>
                </a>
                <a className={sortNavStyle} onClick={() => this.filterChange(2)}>
                    <span>{sortName}</span>
                    <svg className={sortNavStyle}>
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#activity_more"></use>
                    </svg>
                </a>
                <a className={filterNavStyle} onClick={() => this.filterChange(3)}>
                    <span>筛选</span>
                    <svg className={filterType === 3 ? 'open' : ''}>
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#activity_more"></use>
                    </svg>
                </a>
            </div>
        )
    }
}
// 分类
class FilterCategory extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            subCategories: [],
            categoryIndex: 0,  //
            subCategoryIndex: 0,
            subIndex: -1,
        }
    }
    selectCategory = (category = {}, index = 0) => {
        const { onFilterCategoryRestaurants } = this.props;
        this.setState({categoryIndex: index, subCategories: category.sub_categories || []});
        if (index === 0) {
            onFilterCategoryRestaurants(category);
        }
    }
    selectSubCategory = (subCategory = {}, index = -1) => {
        const { onFilterCategoryRestaurants } = this.props;
        this.setState(prevState => ({subIndex: index, subCategoryIndex: prevState.categoryIndex}));
        onFilterCategoryRestaurants(subCategory);   // 更新餐馆列表
    }
    render () {
        const { filterType, categories } = this.props;
        const { categoryIndex, subCategories, subCategoryIndex, subIndex } = this.state;
        const categoryTabs = categories.map((category, index) => {
            return (
                <li className={index === categoryIndex ? asideFilterStyle.active : ''} key={index} onClick={() => this.selectCategory(category, index)} >
                    <span>{category.name}</span>
                    <span styleName="count">{category.count}</span>
                </li>
            )
        });
        const subCategoryList = subCategories.map((subCategory, index) => {
            return (
                <li className={(subCategoryIndex === categoryIndex && index === subIndex) ? asideFilterStyle.active : ''} key={index} onClick={() => this.selectSubCategory(subCategory, index)}>
                    <img styleName="icon" src={subCategory.image} alt={subCategory.name} />
                    <span>{subCategory.name}</span>
                    <span styleName="count">{subCategory.count}</span>
                </li>
            )
        });
        return (
            <section styleName={`filter-wrapper filter-category ${filterType === 1 ? 'open' : ''}`}>
                <div styleName="filter-box">
                    <ul styleName="left-category">{categoryTabs}</ul>
                    <ul styleName="right-category">{subCategoryList}</ul>
                </div>
            </section>
        )
    }
}
// 排序
class FilterSort extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortName: '排序',     // 排序名称
            sortOrder: -1,      // 排序序号
        }
    }

    selectSort = (sort = {}, index = 0) => {
        const { onFilterSortRestaurants } = this.props;
        this.setState({sortName: sort.name, sortOrder: sort.id});
        onFilterSortRestaurants(sort);
    }
    render () {
        const { filterType } = this.props;
        const { sortOrder } = this.state;
        const filterSortList = filterSort.map((sort, index) => {
            return (
                <li onClick={() => this.selectSort(sort)} key={index}>
                    <svg>
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={sort.svg}></use>
                    </svg>
                    <span>{sort.name}</span>
                    {sortOrder === sort.id ?
                        (<svg styleName="selected"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#selected"></use></svg>) : ''}
                </li>
            )
        });
        return (
            <section styleName={`filter-wrapper filter-sort ${filterType === 2 ? 'open' : ''}`}>
                <ul>{filterSortList}</ul>
            </section>
        )
    }
}
// 属性
class FilterSupport extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedDelivery: '',    // 选中的配送方式
            supports: [],     // 选中的商家属性
        }
    }

    selectDelivery = (delivery = '', index = 0) => {
        const { onFilterDelivery } = this.props;
        this.setState({selectedDelivery: delivery});
        onFilterDelivery(delivery);
    }
    selectSupport = (support = '', index = 0) => {
        const { onFilterSupport } = this.props;
        let supports = [...this.state.supports];
        if (supports.indexOf(support) > -1) {
            supports = supports.filter(sup => support !== sup);
        } else {
            supports = [...this.state.supports, support];
        }
        this.setState({supports: supports});
        onFilterSupport(supports);
    }
    resetProp = () => {
        const { onFilterDelivery, onFilterSupport } = this.props;
        this.setState({selectedDelivery: '', supports: []});
        onFilterDelivery();
        onFilterSupport();
    }
    submitFilterProp = () => {
        const { onFilterPropRestaurants } = this.props;
        onFilterPropRestaurants();
    }
    render () {
        const { filterType } = this.props;
        const { selectedDelivery, supports } = this.state;
        const filterDeliveryList = filterDelivery.map((delivery, index) => {
            return (
                <dd className={selectedDelivery === delivery.id ? asideFilterStyle.selected : ''} onClick={() => this.selectDelivery(delivery.id)} key={index}>
                    <svg styleName="icon">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={delivery.svg}></use>
                    </svg>
                    <svg styleName="selected">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#selected"></use></svg>
                    <span>{delivery.name}</span>
                </dd>
            )
        });
        const filterSupportList = filterSupport.map((support, index) => {
            return (
                <dd className={supports.indexOf(support.id) > -1 ? asideFilterStyle.selected : ''} onClick={() => this.selectSupport(support.id)} key={index}>
                    <i styleName="icon" style={{borderColor: support.color, color: support.color}}>{support.icon}</i>
                    <svg styleName="selected"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#selected"></use></svg>
                    <span>{support.name}</span>
                </dd>
            )
        });
        return (
            <section styleName={`filter-wrapper filter-prop ${filterType === 3 ? 'open' : ''}`}>
                <div>
                    <dl>
                        <dt>配送方式</dt>
                        {filterDeliveryList}
                    </dl>
                    <dl>
                        <dt>商家属性(可多选)</dt>
                        {filterSupportList}
                    </dl>
                </div>
                <div styleName="filter-btn">
                    <a styleName="reset" onClick={this.resetProp}>清空</a>
                    <a styleName="ok" onClick={this.submitFilterProp}>确定<span></span></a>
                </div>
            </section>
        )
    }
}

// 筛选组件
class AsideFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filterType: 0,  // 菜单分类
            loadingStatus: !1,  // 加载状态

            categories: [],     // 分类数据
            subCategories: [], // 子分类

            categoryName: '分类',  // 分类名
            sortName: '排序',     // 排序名
        }
        this.query = {
            queryCategoryIds: '',   // 分类编号
            querySortOrder: -1,   // 排序参数
            queryDelivery: '',      // 配送字段
            queryExtras: 'activities',  // 附加参数
            delivery_mode: '',
            support_ids: []
        }
    }
    //
    componentDidMount = () => {
        this.updateRestaurants();
    }

    filterChange = (filterType = 0) => {
        const isShow = filterType !== this.state.filterType;
        if (!isShow) {
            this.setState({filterType: 0});
        } else {
            this.setState({filterType: filterType});
        }
        noScroll(isShow);
    }

    getCategoryData = () => {
        const { categories } = this.state;
        if (!categories.length) {
            fetchCategoryAction().then(res => this.setState({categories: res}));
        }
    }
    filterCategoryRestaurants = (subCategory = {}) => {
        this.setState({
            categoryName: subCategory.name,
            filterType: 0
        });
        this.query.queryCategoryIds = subCategory.id || '';
        this.updateRestaurants();
    }
    filterSortRestaurants = (sort = {}) => {
        this.setState({sortName: sort.name});
        this.query.querySortOrder = sort.id || '',
        this.updateRestaurants();
    }
    filterDelivery = (delivery = '') => {
        this.query.delivery_mode = delivery;
    }
    filterSupport = (supports = []) => {
        this.query.support_ids = supports;
    }
    updateRestaurants = () => {
        const { onFilterRestaurants } = this.props;
        const { queryExtras, queryCategoryIds, querySortOrder, delivery_mode, support_ids } = this.query;
        let query = {
            'extras[]': queryExtras,
            'restaurant_category_ids[]': queryCategoryIds,
            order_by: querySortOrder
        };
        query = delivery_mode ? {...query, delivery_mode: delivery_mode} : query;
        query = support_ids.length ? {...query, support_ids: support_ids} : query;
        onFilterRestaurants(query);
        this.closeAsideFilter();
    }

    closeAsideFilter = () => {
        this.setState({filterType: 0});
        noScroll(!1);
    }

    render () {
        const { filterType, categoryName, sortName, categories } = this.state;
        return (
            <aside styleName="aside-filter">
                <FilterHeader
                    filterType={filterType}
                    categoryName={categoryName}
                    sortName={sortName}
                    onFilterChange={this.filterChange}
                    onGetCategory={this.getCategoryData} />
                <FilterCategory
                    filterType={filterType}
                    categories={categories}
                    onFilterCategoryRestaurants={this.filterCategoryRestaurants} />
                <FilterSort
                    filterType={filterType}
                    onFilterSortRestaurants={this.filterSortRestaurants} />
                <FilterSupport
                    filterType={filterType}
                    onFilterDelivery={this.filterDelivery}
                    onFilterSupport={this.filterSupport}
                    onFilterPropRestaurants={this.updateRestaurants}/>

                <div styleName={`modal ${filterType ? 'active' : ''}`} onClick={this.closeAsideFilter}></div>
            </aside>
        )
    }
}

FilterHeader = cssModules(FilterHeader, asideFilterStyle);
FilterCategory = cssModules(FilterCategory, asideFilterStyle);
FilterSort = cssModules(FilterSort, asideFilterStyle);
FilterSupport = cssModules(FilterSupport, asideFilterStyle);
AsideFilter = cssModules(AsideFilter, asideFilterStyle);
const mapStateToProps = state => {
    return {
        coordinates: state.coordinates,
    }
};
export default connect(mapStateToProps)(AsideFilter);
