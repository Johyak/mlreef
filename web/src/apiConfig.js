//
// When changing or adding variables here, pelase make sure to also add them in the the
// `.env` file with appropriate documentation
//

// API_GATEWAY should be the url to your instance otherwise the develop url
export const API_GATEWAY = process.env.REACT_APP_API_GATEWAY || 'http://localhost';
export const BUILD_TIMEOUT = process.env.REACT_APP_BUILD_TIMEOUT || 18000;
export const POLL_TIMEOUT = process.env.REACT_APP_POLL_TIMEOUT || 10000;
