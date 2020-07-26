import axios from "axios";

export function getUserDetailsAPI(userId) {
  return (dispatch)=>{
    dispatch({type:"USER_DETAILS_API_INIT"});
    
    Promise.all([axios.get(`https://api.github.com/users/${userId}`),
        axios.get(`https://api.github.com/users/${userId}/starred`)])
        .then((res)=>{
          dispatch({type:"USER_DETAILS_SUCCESS",payload:{...res[0].data,star:res[1].data.length}})
        })
        .catch(err=>{
          dispatch({type:"USER_DETAILS_FAILED",payload:"Something went wrong. Please try after some time"})   
    })
        
    
  };
}
