import React, { useState } from "react";
import s from "./Todo.module.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [newNote, setNewNote] = useState([]);
  const [toggleEditBtn, setToggleEditBtn] = useState(true);
  const [edittedNote, setEdittedNote] = useState(null);
  const [emptyMsg, setEmptyMsg] = useState(true);

  let empty = "Empty! please write a Note";

  const clearAll = () => {
    setNewNote([]);
    setEmptyMsg(true);
  };

  const addBtn = () => {
    if (!inputData) {
      alert("Please enter a note in input");
    } else if (inputData && !toggleEditBtn) {
      setNewNote(
        newNote.map((elem) => {
          if (elem.id === edittedNote) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleEditBtn(true);
      setInputData("");
      setEdittedNote(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setNewNote([...newNote, allInputData]);
      setEmptyMsg(false);
      setInputData("");
    }
  };

  const removeBtn = (index) => {
    const updatedNote = newNote.filter((elem) => {
      return index !== elem.id;
    });
    setNewNote(updatedNote);
  };

  const editBtn = (id) => {
    let newEditNote = newNote.filter((elem) => {
      return elem.id === id;
    });
    console.log(newEditNote);
    setToggleEditBtn(false);
    setInputData(newEditNote.name);
    setEdittedNote(id);
  };

  return (
    <div className={s.container}>
      <div className={s.inputDiv}>
        <input
          onChange={(e) => {
            setInputData(e.target.value);
          }}
          value={inputData}
          id="myInput"
          type="text"
          placeholder="What's in Your Mind, Type Here"
        />
        {toggleEditBtn ? (
          <button type="button" id="addBtn" onClick={addBtn}>
            Add
          </button>
        ) : (
          <button type="button" id="addBtn" onClick={addBtn}>
            Save
          </button>
        )}
        <button type="button" className={s.clearBtn} onClick={clearAll}>
          Clear all
        </button>
      </div>

      {emptyMsg ? <h3 className={s.h3}>{empty}</h3> : []}

      <div className={s.showNote}>
        {newNote.map((elem) => {
          return (
            <li className={s.Li} key={elem.id}>
              <h3 className={s.h3}>{elem.name}</h3>
              <button className={s.edit} onClick={() => editBtn(elem.id)}>
                edit
              </button>
              <button id="child" onClick={() => removeBtn(elem.id)}>
                remove
              </button>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
