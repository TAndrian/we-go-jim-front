import { USER } from '../../user/util/UserResourcePath';

const BASE_URL = 'api/v1/';
const BOOKINGS = 'bookings';
const BOOKING = 'booking';

const API_BOOKINGS = BASE_URL + BOOKINGS;
const API_BOOKING = BASE_URL + BOOKING;
const API_BOOKINGS_USER = API_BOOKINGS + '/' + USER + '/';

export { API_BOOKING, API_BOOKINGS, API_BOOKINGS_USER };
