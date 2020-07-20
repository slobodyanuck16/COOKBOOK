import React, { Component } from "react";
import Recipe from "./Recipe";
import CreateRecipeInput from "./CreateRecipeInput";
import {
    createRecipe,
    fetchRecipesList,
    updateRecipe,
    deleteRecipe,
} from "./recipesGateway";
import moment from "moment";

class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showCreate: false,
        };
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    fetchRecipes = () => {
        fetchRecipesList().then((recipesList) => {
            this.setState({
                recipes: recipesList,
            });
        });
    };

    showCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate,
        });
    };

    showInfo = (recipe) => {
        const newRecipe = {
            showInfo: !recipe.showInfo,
        };
        updateRecipe(recipe.id, newRecipe).then(() => this.fetchRecipes());
    };

    onCreate = (form) => {
        const newRecipe = {
            name: form.name,
            ingredients: form.ingredients,
            image: form.image,
            createdAt: new Date(),
            story: [],
            showInfo: false,
        };

        newRecipe.story.push({
            name: newRecipe.name,
            ingredients: newRecipe.ingredients,
            image: newRecipe.image,
            createdAt: moment(newRecipe.createdAt).format("D-MM-YYYY, H:mm"),
        });
        createRecipe(newRecipe).then(() => this.fetchRecipes());
    };

    handleRecipeDelete = (id) => {
        deleteRecipe(id).then(() => this.fetchRecipes());
    };

    onEdit = (form, id) => {
        const filterObj = this.state.recipes.find((recipe) => recipe.id === id);
        filterObj.createdAt = new Date();
        filterObj.name = form.name;
        filterObj.ingredients = form.ingredients;
        filterObj.image = form.image;

        filterObj.story.push({
            updated: moment(filterObj.createdAt).format("D-MM-YYYY, H:mm"),
            name: form.name,
            ingredients: form.ingredients,
            image: form.image,
        });

        updateRecipe(id, filterObj).then(() => this.fetchRecipes());
    };

    render() {
        const sortedList = this.state.recipes
            .slice()
            .sort((a, b) => a.createdAt - b.createdAt);

        return (
            <>
                <div className="todo-list">
                    <button
                        className="waves-effect waves-light create-btn"
                        onClick={this.showCreate}
                    >
                        Create recipe
                    </button>
                    {this.state.showCreate && (
                        <CreateRecipeInput
                            onCreate={this.onCreate}
                            showCreate={this.showCreate}
                        />
                    )}
                    <ul className="list">
                        {sortedList.map((recipe) => {
                            return (
                                <>
                                    <div className="card-background">
                                        <li
                                            key={recipe.id}
                                            className="list-item"
                                            onClick={() =>
                                                this.showInfo(recipe)
                                            }
                                        >
                                            <span className="list-item__text">
                                                {recipe.name}
                                            </span>
                                        </li>
                                        {recipe.showInfo && (
                                            <Recipe
                                                key={recipe.id}
                                                {...recipe}
                                                recipe={recipe}
                                                onDelete={
                                                    this.handleRecipeDelete
                                                }
                                                onEdit={this.onEdit}
                                            />
                                        )}
                                    </div>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </>
        );
    }
}
export default RecipesList;
