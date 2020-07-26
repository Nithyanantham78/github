var init = {
  repoList: [],
  filterData: false,
  repoListFilter: [],
  isRepoAPIPending: false,
  isRepoAPIFailed: false,
  repoApiError: "",
};
export default (state = init, action) => {
  switch (action.type) {
    case "REPOLIST_API_INIT":
      return { ...state, isRepoAPIPending: true };

    case "REPOLIST_API_SUCCESS":
      return { ...state, isRepoAPIPending: false, repoList: action.payload };
    
    case "REPOLIST_API_FAILED":
      return {
        ...state,
        isRepoAPIPending: false,
        isRepoAPIFailed: true,
        repoApiError: action.payload,
      };

    case "REPOLIST_FILTER_TYPES_FROM_STORE":
      switch (action.payload) {
        case "All":
          let list = state.repoList;
          if(action.payloadText){
            list = state.repoList.filter((ele,i)=>ele.name.indexOf(action.payloadText) !== -1)
          }
          return { ...state, filterData: true, repoListFilter: list };
      
        case "Sources":
            let source = state.repoList.filter((ele, i) => !ele.fork);
            if(action.payloadText){
              source = source.filter((ele,i)=>ele.name.indexOf(action.payloadText) !== -1)
            }
            return { ...state, filterData: true, repoListFilter: source };
      
        case "Forks":
            let forks = state.repoList.filter((ele, i) => ele.fork);
            if(action.payloadText){
              forks = forks.filter((ele,i)=>ele.name.indexOf(action.payloadText) !== -1)
            }
            return { ...state, filterData: true, repoListFilter: forks };
        
        case "Custom_Text":
            let searchedText = [];
            if (!action.payloadText) {
              return { ...state, filterData: false };
            } 
            searchedText = state.repoList.filter((ele, i) => ele.name.indexOf(action.payloadText) !== -1);
            return { ...state, filterData: true, repoListFilter: searchedText };
          
        default:
            return {...state,filterData:true,repoListFilter:[]};
      }

    case "REPOLIST_FILTER_LANGUAGE_FROM_STORE":
      return { ...state };
    
    default:
      return state;
  }
};
