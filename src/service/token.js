import { getCookies } from '../utils/utils';
const getToken = () => getCookies('token');
export default getToken;
