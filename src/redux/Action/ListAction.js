import axios from "axios";

export function getRepoList(userId) {
  return async (dispatch)=>{
    try {
      dispatch({type:"REPOLIST_API_INIT"});
      
      let getRepoList = await axios.get(`https://api.github.com/users/${userId}/repos`);
      for(let ele of getRepoList.data){
         let getNetworkCount = await axios.get(ele.url);
         ele.network_count = getNetworkCount.data.network_count?getNetworkCount.data.network_count:0;
      };
      
      dispatch({type:"REPOLIST_API_SUCCESS",payload:getRepoList.data})
    } catch (error) {
      dispatch({type:"REPOLIST_API_FAILED",payload:"Something went wrong. Please try after some time"});       
    }

  }
}
