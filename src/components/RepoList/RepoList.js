import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { getRepoList } from "../../redux/Action/ListAction";
import styles from "./repoList.module.css";

export default (props) => {
  const isRepoAPIPending = useSelector(
    (state) => state.listReducer.isRepoAPIPending
  );
  const filterData = useSelector((state) => state.listReducer.filterData);
  const isAPIFailed = useSelector((state) => state.listReducer.isRepoAPIFailed);
  const errorMessage = useSelector((state) => state.listReducer.repoApiError);
  const repoList = useSelector((state) => state.listReducer.repoList);
  const repoListFilter = useSelector(
    (state) => state.listReducer.repoListFilter
  );
  const dispatch = useDispatch();

  let ListData = [];
  useEffect(() => {
    dispatch(getRepoList("supreetsingh247"));
  }, []);
  
  if (filterData) {
    ListData = repoListFilter.sort(sorting("pushed_at"));
  } else {
    ListData = repoList.sort(sorting("pushed_at"));
  }
  
  let languageColor = {
    HTML: "#e34c26",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
  };
  
  return (
    <div className={`${styles.repositories}`}>
      <Loader loading={isRepoAPIPending} />
      
      {filterData && ListData.length === 0 ? <strong>supreetsingh247 doesn’t have any repositories that match.</strong>: ""}
      
      {!isAPIFailed?<ul>
      {!!filterData&&!!ListData.length&&<strong> {ListData.length} results </strong>}  
      
        {!!ListData.length &&
          ListData.map((ele, i) => {
            let updatedDate = new Date(ele.pushed_at).toString().split(" ");
            return (
              <li key={i} className={`${styles.repositories_li}`}>
                <div className={`${styles.repositories_left} ${styles.repo}`}>
                  <div className={`${styles.linktag}`}>
                    <h3>
                      <a href="#">{ele.name}</a>
                    </h3>
                    {ele.fork && (
                      <span className={`${styles.spangray}`}>
                        Forked from{" "}
                        <a className={`${styles.muted_link}`} href="">
                          {" "}
                          {ele.homepage}
                        </a>
                      </span>
                    )}
                  </div>

                  <div>
                    <p className={`${styles.textarea_pra}`}>
                      {ele.description}
                    </p>
                  </div>

                  <div className={`${styles.bottom_details}`}>
                    {ele.language && (
                      <>
                        <span
                          className={`${styles.bottom_details_span}`}
                          style={{
                            backgroundColor: languageColor[ele.language],
                          }}
                        ></span>
                        <span className={`${styles.bottom_details_text}`}>
                          &#160;{ele.language}
                        </span>
                      </>
                    )}
                    {!!ele.network_count && (
                      <a className={`${styles.muted_link}`} href="#">
                        <svg
                          aria-label="fork"
                          className={`${styles.octicon} ${styles.octicon_repo_forked}`}
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          height="16"
                          role="img"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          ></path>
                        </svg>
                        &#160;
                        {ele.network_count}
                      </a>
                    )}
                    {!!ele.stargazers_count && (
                      <a className={`${styles.muted_link}`} href="#">
                        <svg
                          height="16"
                          text="gray-light"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                          ></path>
                        </svg>
                        &#160;
                        {ele.stargazers_count}
                      </a>
                    )}
                    {ele.license && (
                      <span className={`${styles.spanmuted}`}>
                        <svg
                          className={`${styles.octicon} ${styles.octicon_law}`}
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
                          ></path>
                        </svg>
                        &#160;
                        {ele.license.name}
                      </span>
                    )}
                    Updated on {updatedDate[1]} {updatedDate[2]},{" "}
                    {updatedDate[3]}
                  </div>
                </div>

                <div className={`${styles.repositories_right} ${styles.repo}`}>
                  <div className="">
                    <span
                      className={`${styles.tooltipped} ${styles.tooltipped_s}`}
                      aria-label="Past year of activity"
                    >
                      <svg width="155" height="30">
                        <defs>
                          <linearGradient
                            id="gradient-76626259"
                            x1="0"
                            x2="0"
                            y1="1"
                            y2="0"
                          >
                            <stop offset="10%" stopColor="#9be9a8"></stop>
                            <stop offset="33%" stopColor="#40c463"></stop>
                            <stop offset="66%" stopColor="#30a14e"></stop>
                            <stop offset="90%" stopColor="#216e39"></stop>
                          </linearGradient>
                          <mask
                            id="sparkline-76626259"
                            x="0"
                            y="0"
                            width="155"
                            height="28"
                          >
                            <polyline
                              transform="translate(0, 28) scale(1,-1)"
                              points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 "
                              fill="transparent"
                              stroke="#8cc665"
                              strokeWidth="2"
                            ></polyline>
                          </mask>
                        </defs>

                        <g transform="translate(0, -12)">
                          <rect
                            x="0"
                            y="-2"
                            width="155"
                            height="30"
                            style={{
                              stroke: "none",
                              fill: "url('#gradient-76626259')",
                              mask: "url('#sparkline-76626259')",
                            }}
                          ></rect>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>:<div>{errorMessage}</div>}
    </div>
  );
};

function sorting(key) {
  return (a, b)=>{
    const varA = new Date(a[key]);
    const varB = new Date(b[key]);
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return comparison * -1;
  };
}
