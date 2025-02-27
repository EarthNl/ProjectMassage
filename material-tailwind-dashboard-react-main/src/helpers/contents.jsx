export const staffService = {
    GET_STAFF_URL: "staff/get",
    GETLIST_STAFF_URL: "staff/get-list",
    GETBYID_STAFF_URL: "staff/getbyid",
    INSERT_STAFF_URL: "staff/insert",
    UPDATE_STAFF_URL: "staff/update",
    DELETE_STAFF_URL: "staff/delete",
}

export const userService = {
    LOGIN_URL: "user/login",
    AUTHEN_URL: "user/authen",
    GET_USER_URL: "user/get",
    GETBYID_USER_URL: "user/getbyid",
    INSERT_USER_URL: "user/insert",
    UPDATE_USER_URL: "user/update",
    DELETE_USER_URL: "user/delete",
}

export const serviceService = {
    GET_SERVICE_URL: "service/get",
    GETLIST_SERVICE_URL: "service/get-list",
    GETBYID_SERVICE_URL: "service/getbyid",
    INSERT_SERVICE_URL: "service/insert",
    UPDATE_SERVICE_URL: "service/update",
    DELETE_SERVICE_URL: "service/delete",
}

export const bookingService = {
    GET_BOOKING_URL: "booking/get",
    GETLIST_BOOKING_URL: "booking/get-list",
    GETBYID_BOOKING_URL: "booking/getbyid",
    INSERT_BOOKING_URL: "booking/insert",
    UPDATE_BOOKING_URL: "booking/update",
    DELETE_BOOKING_URL: "booking/delete",
}

export const removeAllStorage = async () => {
    let keys = ['user', 'role'];
    keys.forEach(k => localStorage.removeItem(k))
    window.location.reload()
    return
}

export const removeStorage = async (key) => {
    localStorage.removeItem(key)
    return
}

// Local Storage
export const setStorage = (key, value) => localStorage.setItem(key, value)
export const getStorage = (key) => localStorage.getItem(key) 