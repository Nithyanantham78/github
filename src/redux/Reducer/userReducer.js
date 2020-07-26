var init = {
  userDetails: {},
  isAPIFailed: false,
  errorMsg: "",
  isAPIPending: false,
};

export default (state = init, action) => {
  switch (action.type) {
    
    case "USER_DETAILS_API_INIT":
      return { ...state, isAPIPending: true };
    
    case "USER_DETAILS_SUCCESS":
      return {
        ...state,
        isAPIFailed: false,
        isAPIPending: false,
        userDetails: action.payload,
      };
    
    case "USER_DETAILS_FAILED":
      return {
        ...state,
        isAPIFailed: true,
        isAPIPending: false,
        errorMsg: action.payload,
      };
    
    default:
      return state;
  }
};
