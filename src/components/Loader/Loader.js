import React from "react";
import styles from "./Loader.module.css";

class Loader extends React.Component {
	render() {
		let show = this.props.loading;
		return (
			<div className={`${styles.loading__spinner} ${show?styles.show:''}`}>
              <img src ="images/ajax-loader.gif" className={`${styles.loading__spinnerimg}`} alt="spinner img"/>
            </div>
		);
	}
}

export default Loader;
