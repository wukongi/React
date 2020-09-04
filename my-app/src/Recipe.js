import React from "react";
import style from "./Recipe.module.css";
const Recipe = ({ title, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h3>{title}</h3>
      <ol>
        {ingredients ? (
          ingredients.map((ingredient) => <li>{ingredient.text}</li>)
        ) : (
          <></>
        )}
      </ol>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default Recipe;
