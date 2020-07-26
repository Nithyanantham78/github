import React, { Component } from "react";
import styles from "./home.module.css";
import Profile from "../components/Profile/Profile";
import Search from "../components/Search/Search";
import RepoList from "../components/RepoList/RepoList";

export default class Home extends Component {
  render() {
    return (
      <>
        <main>
          <section>
            <div className={`${styles.wrapper}`}>
              <Profile />
              <div className={`column ${styles.wrapper_right}`}>
                <div className={`${styles.contentarea}`}>
                  <Search />
                  <RepoList />
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}
