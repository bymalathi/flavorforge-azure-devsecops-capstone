import "./RecipeCard.css";
import Card from "../ui/Card/Card";

function RecipeCard({ recipe }) {
  return (
    <Card>
      <div className="recipe-card">

        <h3>{recipe.name}</h3>

        <p>
          <strong>Category:</strong> {recipe.category}
        </p>

        <p>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </p>

      </div>
    </Card>
  );
}

export default RecipeCard;