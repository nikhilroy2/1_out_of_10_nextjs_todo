import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useRef } from "react";
export default function Home() {
  return (
    <div className={styles.container}>
      <NextJsToDo></NextJsToDo>
    </div>
  );
}
let list_copy;
const NextJsToDo = () => {
  // for list value
  const [txtValue, setTxtValue] = useState([]);

  // for update action
  const [txtUpdate, setTxtUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState();

  function txtListFunc() {
    list_copy = [...txtValue];

    list_copy = [...list_copy, inputValue.current.value];

    setTxtValue(list_copy);

    //console.log(txtValue);
    // reset input value
    inputValue.current.value = "";
  }

  let inputValue = useRef();
  const btnHandle = () => {
    return txtListFunc();
  };

  const btnDeleteHandle = (i) => {
    list_copy.splice(i, 1); // removing array by index itself;
    let newList_copy = [...list_copy];
    setTxtValue(newList_copy);
    //console.log(newList_copy)
  };

  const btnEditHandle = (i) => {
    let newList_copy = list_copy[i];
    inputValue.current.value = newList_copy;
    setTxtUpdate(true);
    setUpdateIndex(i);
  };

  const btnUpdateHandle = () => {
    setTxtUpdate(false);
    list_copy[updateIndex] = inputValue.current.value;
    let newList_copy = [...list_copy];
    setTxtValue(newList_copy);
    inputValue.current.value = "";
  };

  return (
    <div id={styles.NextJsToDo}>
      <div className="form_wrapper">
        <div className="input_group">
          <label htmlFor="" className={styles.input_label}>
            Type something...
          </label>
          <input 
            ref={inputValue}
            className={styles.input_control}
            type="text"
          />
        </div>
        <div className="btn_action">
          {txtUpdate ? (
            <button
              className={styles.actionBtn}
              onClick={() => btnUpdateHandle()}
            >
              Update
            </button>
          ) : (
            <button className={styles.actionBtn} onClick={() => btnHandle()}>
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="list_view">
        <ol style={{ color: "whtie" }}>
          {txtValue.map((v, i) => {
            return (
              <li key={i}>
                <div className={styles.todo_list}>
                  <div className="todo_txt">{v}</div>
                  <div className="todo_control">
                    <button
                      onClick={() => btnDeleteHandle(i)}
                      className={styles.btn_delete}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => btnEditHandle(i)}
                      className={styles.btn_edit}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
