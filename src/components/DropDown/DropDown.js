import React from "react";
import styles from "./dropdown.module.css";

export default (props) => {
  let { types, onChangeProps, options } = props;
  return (
    <>
      <select
        onChange={onChangeProps}
        name={types}
        className={`${styles.listid}`}
      >
        {options.map((ele, i) => {
          return <option key={i}>{ele}</option>;
        })}
      </select>
    </>
  );
};
