import React, { PureComponent } from 'react';
import ReactSwipe from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cssModules from '../../../utils/cssModules';
import entrieStyle from '../../../style/entries.css';

// 分类入口组件
const EntryList = ({ entries = [], geohash = '' }) => {
    let listItems = [];
    let entryList = [];
    // if (entries.length) {
        listItems = entries.map((entry,i) => {
            const newlink = decodeURIComponent(entry.link);
            entry = { ...entry, link: ('/msite/food/#geohash='+geohash+'#'+newlink.slice(newlink.indexOf('target')))};
            return (
                <Link to={entry.link} key={i}>
                    <img src={entry.image_src} alt={entry.name}/><span className={entrieStyle['title']}>{entry.name}</span>
                </Link>
            );
        });
        entryList = Array.from({length: Math.ceil(listItems.length/8)}, () => [])
                        .map((v,i,s) => <div className={entrieStyle['item']} key={i}>{listItems.map((item,j) => (parseInt(j/8, 10) === i) && item)}</div>);
    // }
    return (
        <ReactSwipe className={entrieStyle['entry-swipe']}>{entryList}</ReactSwipe>
    )

}

class Entries extends PureComponent {
    static propTypes = {
        loadStatus: PropTypes.bool.isRequired,
        entries: PropTypes.array.isRequired,
        geohash: PropTypes.string,
    }
    static defaultProps = {
        loadStatus: !1,
        entries: [],
        geohash: '',
    }
    render() {
        const { loadStatus, entries, geohash } = this.props;
        return (
            <div styleName="entry-wrap">
                {loadStatus && <EntryList entries={entries} geohash={geohash} />}
            </div>
        );
    }
}

Entries = cssModules(Entries, entrieStyle);
export default Entries;
