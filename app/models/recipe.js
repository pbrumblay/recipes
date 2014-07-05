var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    Name: String,
    Amount: String
});

var RecipeSchema = new Schema({
    Name: String,
    Description: String,
    Source: String,
    Instructions: String,
    IngredientsSearchText: String,
    Visible: Boolean,
    Ingredients: [IngredientSchema],
    CategoryName: String
});

module.exports = {
    Ingredient: mongoose.model('Ingredient', IngredientSchema),
    Recipe: mongoose.model('Recipe', RecipeSchema)
};
