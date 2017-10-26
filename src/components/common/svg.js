import svg from '../../assets/app.svg';
import svgLogo from '../../assets/logo.svg';
import svgLogoActive from '../../assets/logo.active.svg';
import svgDiscover from '../../assets/discover.svg';
import svgDiscoverActive from '../../assets/discover.active.svg';
import svgOrder from '../../assets/order.svg';
import svgOrderActive from '../../assets/order.active.svg';
import svgProfile from '../../assets/profile.svg';
import svgProfileActive from '../../assets/profile.active.svg';

export const getIcon = iconId => (svg + iconId);

// common
export const icon_arrow_left = svg + '#arrow-left';
export const icon_arrow_down = svg + '#arrow_down';
// home
export const icon_location = svg + '#location';
export const icon_rating_star = svg + '#rating-star';
export const icon_activity_more = svg + '#activity-more';
// footer
export const icon_logo = svgLogo;
export const icon_logo_active = svgLogoActive;
export const icon_discover = svgDiscover;
export const icon_discover_active = svgDiscoverActive;
export const icon_order = svgOrder;
export const icon_order_active = svgOrderActive;
export const icon_profile = svgProfile;
export const icon_profile_active = svgProfileActive;
// profile
export const icon_avatar_default = svg + '#avatar-default';
export const icon_profile_mobile = svg + '#mobile';
export const icon_arrow_right = svg + '#arrow-right';
export const icon_profile_luckybag = svg + '#luckybag';
export const icon_profile_coins = svg + '#coins';
export const icon_profile_order = svg + '#order';
export const icon_profile_point = svg + '#point';
export const icon_profile_vip = svg + '#vip';
export const icon_profile_service = svg + '#service';
export const icon_profile_download = svg + '#download';
// login
export const icon_login_logo = svg + '#login-logo';
// restaurantsFilter
export const icon_filter_selected = svg + '#selected';
