import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import emptyStyle from '../../style/empty.css';

// 空页面组件
const Empty = props => {
    const { match, location } = props;
    return (
        <div className={emptyStyle.empty}>
            <Header title="建设中..." />
            <h2>正在建设中...<p>UNDER CONSTRUCTION</p></h2>
            <Footer match={match} location={location} />
        </div>
    );
}

export default Empty;
