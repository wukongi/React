import React, { useState } from "react";
import phoneService from "../service/phoneBook";
import Notification from "./Notification";

const PersonForm = ({ persons, setPersons }) => {
  //name和number状态
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [message, setMessage] = useState(null);
  //设置input onchange事件
  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const numberHandle = (event) => {
    setNumber(event.target.value);
  };
  //设置input submit事件
  const handleClick = (event) => {
    event.preventDefault();
    const phoneBook = {
      name: newName,
      number: newNumber,
    };
    const addName = () => {
      phoneService
        .create(phoneBook)
        .then((returnedInfo) => {
          setPersons(persons.concat(returnedInfo));
          setMessage(`${returnedInfo.name} has been added`);
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          setMessage(error);
        });
    };
    addName();
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  return (
    <>
      <Notification message={message} />
      <form>
        <div>
          <label htmlFor="name">&nbsp;&nbsp;&nbsp;&nbsp;name:</label>
          <input value={newName} onChange={handleChange} id="name" />
        </div>
        <div>
          <label htmlFor="number">number:</label>
          <input id="number" value={newNumber} onChange={numberHandle} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
    </>
  );
};
export default PersonForm;
