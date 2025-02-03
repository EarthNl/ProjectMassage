export const userService = {
    //User
    POST_LOGIN_URL: "user/login",
    POST_CHECKLOGIN_URL: "user/protected",
    GET_USER_URL: "user/get",
    GET_USER_SEARCH_URL: "user/search",
    GETLIST_USER_URL: "user/getlist",
    POST_USER_URL: "user/post",
    PUT_USER_URL: "user/put",
    DELETE_UPDARE_STATUS_URL: "user/update-status",
    DELETE_USER_URL: "user/delete",
}

export const asset_service = {
    //search
    GET_ASSET_SEARCH_URL: "asset/search",
    //asset warehouse
    GET_ASSET_URL: "asset/get",
    GET_ASSET_WHAREHOUSE_URL: "asset/get-group",
    GETBYID_ASSET_WHAREHOUSE_URL: "asset/get-by-id",
    POST_ASSET_WHAREHOUSE_URL: "asset/post",
    PUT_ASSET_WHAREHOUSE_URL: "asset/put",
    PUT_SHOW_ASSET_WHAREHOUSE_URL: "asset/put-show",
    DELETE_ASSET_WHAREHOUSE_URL: "asset/delete",
    //assetType
    GET_ASSETTYPE_URL: "asset-type/get",
    GETLIST_ASSETTYPE_URL: "asset-type/getlist",
    POST_ASSETTYPE_URL: "asset-type/post",
    PUT_ASSETTYPE_URL: "asset-type/put",
    DELETE_ASSETTYPE_URL: "asset-type/delete",
}

//ท่องเที่ยว
export const travelService = {
  GET_TRAVEL_URL: "travel/get",
  GETLIST_TRAVEL_URL: "travel/getlist",
  GETBYID_TRAVEL_URL: "travel/getbyid",
  GETBYID_TRAVEL_TO_TYPE_URL: "travel/getbyid-to-type",
  GETBYID_TRAVEL_TO_ACTIVITY_URL: "travel/getbyid-to-activity",
  GETBYID_TRAVEL_TO_IMG_URL: "travel/getbyid-to-img",
  INSERT_TRAVEL_URL: "travel/insert",
  UPDATE_TRAVEL_URL: "travel/update",
  UPDATE_TRAVEL_ISUSE_URL: "travel/update-isuse",
  DELETE_TRAVEL_URL: "travel/delete",
  DELETE_TRAVEL_IMG_URL: "travel/delete-img",
};

  
//ประเภทท่องเที่ยว
export const travelTypeService = {
  GET_TRAVELTYPE_URL: "travel-type/get",
  GETLIST_TRAVELTYPE_URL: "travel-type/get-list",
  INSERT_TRAVELTYPE_URL: "travel-type/insert",
  UPDATE_TRAVELTYPE_URL: "travel-type/update",
  DELETE_TRAVELTYPE_URL: "travel-type/delete",
};

//กิจกรรมท่องเที่ยว
export const travelActivityService = {
    GET_TRAVELACTIVITY_URL: "travel-activity/get",
    GETLIST_TRAVELACTIVITY_URL: "travel-activity/get-list",
    INSERT_TRAVELACTIVITY_URL: "travel-activity/insert",
    UPDATE_TRAVELACTIVITY_URL: "travel-activity/update",
    DELETE_TRAVELACTIVITY_URL: "travel-activity/delete",
  };

//ที่อยู่
  export const addressService = {
    GET_TAMBON_URL: "address/get-tambon",
    GET_AMPHUR_URL: "address/get-amphur",
    GET_PROVINCE_URL: "address/get-province",
    GET_GEOGRAPHY_URL: "address/get-geography",
  };
  

export const removeAllStorage = async () => {
    let keys = ['', ''];
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