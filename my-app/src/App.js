import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "./App.css";
const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const APP_ID = "7e4c568f";
  const APP_KEY = "3f924427ed916a09814d519e7e0c526c";

  useEffect(() => {
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.hits));
  }, [query]);

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          type="text"
          className="search-input"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingrdients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
