import React, { PureComponent } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import cssModules from '../../utils/cssModules';
import {
    icon_logo, icon_logo_active,
    icon_discover, icon_discover_active,
    icon_order, icon_order_active,
    icon_profile, icon_profile_active
} from '../common/svg.js';
import footerStyle from '../../style/footer.css';

const FooterIcon = props => <img src={props.image} alt="外卖" className={footerStyle.icon} />;

// 底部
class Footer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            logoImage: icon_logo,
            discoverImage: icon_discover,
            orderImage: icon_order,
            profileImage: icon_profile,
            active: 1,
        };
    }
    componentDidMount = () => {
        const location = this.props.location;
        if (!location) return;
        const path = location.pathname;
        if (path.match(/^\/$/) || path.match(/^\/msite/)) {
            this.setState({logoImage: icon_logo_active});
            this.setState({active: 1});
        } else if (path.match(/^\/discover/)) {
            this.setState({discoverImage: icon_discover_active});
            this.setState({active: 2});
        } else if (path.match(/^\/order/)) {
            this.setState({orderImage: icon_order_active});
            this.setState({active: 3});
        } else if (path.match(/^\/profile/)) {
            this.setState({profileImage: icon_profile_active});
            this.setState({active: 4});
        }
    }
    render () {
        const { logoImage, discoverImage, orderImage, profileImage, active } = this.state;
        return (
            <footer styleName="footer-bar">
                <NavLink to="/msite/" styleName={`item ${active === 1 ? 'active' : ''}`} activeClassName="active">
                    <FooterIcon image={logoImage} />
                    <span>外卖</span>
                </NavLink>
                <NavLink to="/discover/" styleName={`item ${active === 2 ? 'active' : ''}`} activeClassName="active">
                    <FooterIcon image={discoverImage} />
                    <span>发现</span>
                </NavLink>
                <NavLink to="/order/" styleName={`item ${active === 3 ? 'active' : ''}`} activeClassName="active">
                    <FooterIcon image={orderImage} />
                    <span>订单</span>
                </NavLink>
                <NavLink to="/profile/" styleName={`item ${active === 4 ? 'active' : ''}`} activeClassName="active">
                    <FooterIcon image={profileImage} />
                    <span>我的</span>
                </NavLink>
            </footer>
        );
    }
}

export default withRouter(cssModules(Footer, footerStyle));
