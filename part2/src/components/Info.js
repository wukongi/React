import React from "react";
import phoneService from "../service/phoneBook";
const Info = ({ persons, infoDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button value={person.id} onClick={infoDelete}>
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Info;
