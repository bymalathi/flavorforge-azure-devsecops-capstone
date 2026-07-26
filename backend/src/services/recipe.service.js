function getRecipes() {

    console.log("➡️ Recipe Service reached");
    
  return [
    {
      id: 1,
      name: "Paneer Butter Masala",
      category: "Indian",
      difficulty: "Medium",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Italian",
      difficulty: "Easy",
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      category: "Dessert",
      difficulty: "Easy",
    },
    {
      id: 4,
      name: "Veg Fried Rice",
      category: "Asian",
      difficulty: "Easy",
    },
    {
      id: 5,
      name: "Chickpea Salad",
      category: "Healthy",
      difficulty: "Easy",
    },
    {
      id: 6,
      name: "Masala Dosa",
      category: "South Indian",
      difficulty: "Hard",
    },
  ];
}

module.exports = {
  getRecipes,
};