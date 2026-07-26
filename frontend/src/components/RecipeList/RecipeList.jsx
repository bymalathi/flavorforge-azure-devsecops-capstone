import { useEffect, useState } from "react";

import "./RecipeList.css";

import { getRecipes } from "../../services/recipeService";

import RecipeCard from "../RecipeCard/RecipeCard";
import Loading from "../ui/Loading/Loading";
import Card from "../ui/Card/Card";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await getRecipes();

        setRecipes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  if (loading) {
    return <Loading message="Loading recipes..." />;
  }

  if (error) {
    return (
      <Card>
        <p>❌ {error}</p>
      </Card>
    );
  }

  return (
    <section className="recipe-list">

      <h2>Featured Recipes</h2>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>

    </section>
  );
}

export default RecipeList;