/**
 * 一个简单的无限滚动组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cssModules from '../../utils/cssModules';
// import { throttle, getStyle } from '../../utils/utils';
import { getScrollTop, getVisibleHeight } from '../../utils/dom';
import infiniteScrollStyle from '../../style/infinite.scroll.css';


class InfiniteScroll extends Component {
    static propTypes = {
        children: PropTypes
          .oneOfType([PropTypes.object, PropTypes.array])
          .isRequired,
        hasMore: PropTypes.bool,
        initialLoad: PropTypes.bool,
        // isReverse: PropTypes.bool,
        loader: PropTypes.object,
        loadMore: PropTypes.func.isRequired,
        pageStart: PropTypes.number,
        // ref: PropTypes.func,
        threshold: PropTypes.number,
    };

    static defaultProps = {
        hasMore: false,
        initialLoad: true,
        pageStart: 0,
        // ref: null,
        threshold: 200,
        loader: null,
    };
    componentDidMount = () => {
        const { pageStart } = this.props;
        this.pageNumber = pageStart;
        window.addEventListener('scroll', this.attachScrollListener);
    }
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.attachScrollListener);
    }
    attachScrollListener = (event) => this.scroller();
    detachScrollListener = () => {

    }
    scroller = () => {
        const { loadMore, hasMore, threshold, isLoading } = this.props;
        if (!hasMore || isLoading) return;
        const offset = getVisibleHeight(this.scrollElement) - getScrollTop(window) - document.documentElement.clientHeight;
        if (this.lastOffset && offset > this.lastOffset) return;
        if (offset <= Number(threshold)) {
            this.lastOffset = threshold;
            // this.detachScrollListener();
            // Call loadMore after detachScrollListener to allow for non-async loadMore functions
            typeof loadMore === 'function' && loadMore(this.pageNumber += 1);
        }
    }
    render () {
        const { children } = this.props;
        return (
            <div styleName="scroll-wrapper" ref={el => this.scrollElement = el}>
                {children}
            </div>
        )
    }
}

export default cssModules(InfiniteScroll, infiniteScrollStyle);
