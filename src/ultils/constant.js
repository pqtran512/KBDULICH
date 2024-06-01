export const path = {
    AUTH: '/auth',
    SYSTEM_AUTH: '/system-auth',
    LOGIN: 'login',
    REGISTER: 'register',
    RESETPASS1: 'reset_pass1',
    RESETPASS2: 'reset_pass2',
    RESETPASS2_TOKEN: 'reset_pass2/:token',
    INSTRUCTION: 'instruction',

    HOME: '/*',
    SEARCH: 'search',
    SEARCH__PAGE: 'search/:page',
    TOUR_DETAIL: 'tour-detail/*',
    TOUR_DETAIL_ID: 'tour-detail/:tourID',
    TOUR_BOOKING: 'tour-booking/:tourID',
    TOUR_BOOKING2: 'tour-booking2/:tourID',
    TOUR_BOOKING3: 'tour-booking3/:tourID',
    NEWS: 'news',
    NEWS_DETAIL: 'news-detail/:province',
    PERSONAL_PROFILE: 'personal-profile',
    CONTACT: 'contact',
    POLICY: 'policy',

    STAFF_HOME: '/staff/*',
    MANAGER_HOME: '/manager/*',
    TOUR_LIST: 'tour',
    SYSTEM_TOUR_DETAIL: 'tour-detail/:tourID',
    TOUR_NEW: 'tour-new',
    TOUR_EDIT: 'tour-edit/:tourID',

    CUSTOMER_DETAIL: 'customer-detail/:orderID',
    
    REQUEST_LIST: 'request',
    REQUEST_DETAIL: 'request-detail/:requestID',
    REQUEST_DUP: 'dup',
    REQUEST_ADD: 'request_add',
    REQUEST_REPLY: 'request_reply',
    
    STAFF_LIST: 'staff',
    STAFF_DETAIL: 'staff-detail/:staffID',
    STAFF_NEW: 'staff-new',
    STAFF_EDIT: 'staff-edit/:staffID',

    REPORT: 'report',
    ACCOUNT: 'account'
}