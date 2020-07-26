import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DropDown from "../DropDown/DropDown";
import styles from "./search.module.css";

export default (props) => {
  const [text, setText] = useState("");
  const [types, setTypes] = useState("");
  const dispatch = useDispatch();

  let onChangeMethod = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTypes(value);
    if (name === "Types") {
      dispatch({ type: "REPOLIST_FILTER_TYPES_FROM_STORE", payload: value });
    }
  };

  useEffect(() => {
    if (types) {
      dispatch({
        type: "REPOLIST_FILTER_TYPES_FROM_STORE",
        payload: types,
        payloadText: text,
      });
    }else{
        dispatch({
            type: "REPOLIST_FILTER_TYPES_FROM_STORE",
            payload: "Custom_Text",
            payloadText: text,
          });  
    }
  }, [text]);

  return (
    <div className={`${styles.form_details}`}>
      <form className={`${styles.form_list}`}>
        <div className={`${styles.form_input} ${styles.repoform}`}>
          <input
            type="text"
            defaultValue={text}
            className={`${styles.form_control}`}
            onChange={(e) => setText(e.target.value)}
            placeholder="Find a repository…"
          />
        </div>
        <div className={`${styles.form_sel} ${styles.repoform}`}>
          <DropDown
            types="Types"
            options={["All", "Sources", "Forks", "Archived", "Mirrors"]}
            onChangeProps={onChangeMethod}
          />
          <DropDown
            types="Language"
            options={["All"]}
            onChangeProps={onChangeMethod}
          />
        </div>
      </form>
      <button className={styles.addNew}>New</button>
    </div>
  );
};
