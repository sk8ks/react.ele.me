import React, { Component, PureComponent } from 'react';
import cssModules from '../../../../utils/cssModules';
import restaurantStyle from '../../../../style/restaurant.css';

// 优惠活动项目
const Activity = ({iconName, description}) => {
    return (
        <div className={restaurantStyle['activity-item']}>
            {iconName == '新' && <i className={restaurantStyle['icon-new']}>{iconName}</i>}
            {iconName == '减' && <i className={restaurantStyle['icon-reduce']}>{iconName}</i>}
            {iconName == '特' && <i className={restaurantStyle['icon-discount']}>{iconName}</i>}
            {iconName == '折' && <i className={restaurantStyle['icon-discount']}>{iconName}</i>}
            {iconName == '赠' && <i className={restaurantStyle['icon-give']}>{iconName}</i>}
            <span>{description}</span>
        </div>
    );
}
// 商家优惠活动列表
class Activities extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {activityMore: !1};
    }
    // 活动显示开关
    activitySwitch = (e) => {
        e.stopPropagation();    // 阻止冒泡，防止点击触发路由跳转
        this.setState({activityMore: !this.state.activityMore});
    }

    render () {
        const { activities } = this.props;
        const { activityMore } = this.state;
        const activityList = activities.map((activity, index) => {
            const {icon_name, description, ...rest} = activity;
            return (index < 2 || activityMore) && (
                <Activity iconName={icon_name} description={description} key={index} />
            );
        });

        return (
            <section styleName="activities-sect">
                <div styleName="activities-list">{activityList}</div>
                <div styleName="activity-bar" onClick={this.activitySwitch} >{activities.length}个活动
                    {activityList.length > 2 && <svg styleName={activityMore ? 'activity-open': ''}>
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#activity_more"></use>
                    </svg>}
                </div>
            </section>
        );
    }
}
Activities = cssModules(Activities, restaurantStyle);
export default Activities;
