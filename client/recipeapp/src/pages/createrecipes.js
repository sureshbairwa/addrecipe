import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipes = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipes, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipes, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipes.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipes, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipes.ingredients, ""];
    setRecipe({ ...recipes, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipes },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipes">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Recipe Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipes.name}
          onChange={handleUpdate}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipes.description}
          onChange={handleUpdate}
        ></textarea>
        <label htmlFor="ingredients">Add Ingredients</label>
        {recipes.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Cooking Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipes.instructions}
          onChange={handleUpdate}
        ></textarea>
        <label htmlFor="imageUrl">Image URL/Link</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipes.imageUrl}
          onChange={handleUpdate}
        />
        <label htmlFor="cookingTime">Cooking Time Taken (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipes.cookingTime}
          onChange={handleUpdate}
        />
        <button type="submit">Create New Recipe</button>
      </form>
    </div>
  );
};
