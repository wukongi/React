import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Info from "./components/Info";
import phoneService from "./service/phoneBook";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    phoneService.getAll().then((returnedInfo) => setPersons(returnedInfo));
  }, []);

  const [persons, setPersons] = useState([]);
  const infoDelete = (event) => {
    const did = event.target.value;
    const filterPerson = persons.filter((person) => person.id !== did);
    if (window.confirm("really delete")) {
      phoneService.deleteInfo(did);
      setPersons(filterPerson);
    }
  };
  return (
    <>
      <h2>Phonebook</h2>

      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Info persons={persons} infoDelete={infoDelete} />
      <Footer />
    </>
  );
};

export default App;
