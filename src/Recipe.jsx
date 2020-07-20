import React from "react";
import { useState } from "react";
import moment from "moment";

const Recipe = ({
    id,
    name,
    image,
    ingredients,
    createdAt,
    onDelete,
    onEdit,
    story,
}) => {
    const [edit, changeEdit] = useState(false);
    const [showStory, handleStory] = useState(false);
    const [form, setForm] = useState({});
    const [info, showInfo] = useState(false)

    

    const updatedForm = {
        name: name,
        ingredients: ingredients,
        image: image,
    };

    const handleText = (e) => {
        const { name, value } = e.target;
        console.log("value: ", value);
        console.log("form: ", form);
        console.log("updatedForm: ", updatedForm);

        setForm({
            ...updatedForm,
            [name]: value,
        });
    };

    const editSumbit = (e, id) => {
        e.preventDefault();
        onEdit(form, id);
        changeEdit(!edit);
    };

    const listArray = ingredients.split(",");

    return (
        <>
            <div className="recipe-info">
                <div className="recipe-info__image-container">
                    <img
                        className="recipe-info__image-container_image"
                        src={
                            image === ""
                                ? "https://wallpaperaccess.com/full/271679.jpg"
                                : image
                        }
                        alt="food"
                    />
                </div>
                <div className="recipe-info__description">
                    <h4 className="recipe-info__description_title">
                        Ingredients
                    </h4>
                    <div className="recipe-info__description_ingredients">
                        {listArray.map((word) => (
                            <li key={word}>{word}</li>
                        ))}
                    </div>
                    <div className="recipe-info__description_date-btns">
                        <div className="recipe-info__description_date">
                            {story.length <= 1
                                ? `Created: ${moment(createdAt).format(
                                      "D-MM-YYYY, H:mm"
                                  )}`
                                : `Updated: ${moment(createdAt).format(
                                      "D-MM-YYYY, H:mm"
                                  )}`}
                        </div>
                        <div className="recipe-info__description__btns">
                            <button
                                className={edit ? "recipe-info__description__btns_edit active" : "recipe-info__description__btns_edit"}
                                onClick={() => changeEdit(!edit)}
                            >
                                Edit
                            </button>
                            <button
                                className="recipe-info__description__btns_delete"
                                onClick={() => onDelete(id)}
                            >
                                Delete
                            </button>
                            <button
                                className={
                                    showStory
                                        ? "recipe-info__description__btns_story active"
                                        : "recipe-info__description__btns_story"
                                }
                                onClick={() => handleStory(!showStory)}
                            >
                                {showStory ? "Hide story" : "Show story"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {edit && (
                <div className="edit-form">
                    <form onSubmit={(e) => editSumbit(e, id)}>
                        <div className="edit-form__item">
                            <div className="edit-form__text">Name</div>
                            <input
                                name="name"
                                defaultValue={name}
                                onChange={(event) => handleText(event)}
                                placeholder="Write the name of your dish"
                                className="edit-form__input"
                            />
                        </div>
                        <div className="edit-form__item">
                            <div className="edit-form__text">
                                {"Ingredients ( put commas to get a list :) )"}
                            </div>
                            <input
                                name="ingredients"
                                defaultValue={ingredients}
                                onChange={(event) => handleText(event)}
                                placeholder="Write some ingredients"
                                className="edit-form__input"
                            />
                        </div>
                        <div className="edit-form__item">
                            <div className="edit-form__text">Image</div>

                            <input
                                name="image"
                                defaultValue={image}
                                onChange={(event) => handleText(event)}
                                placeholder="Enter image URL of your dish (or our standard picture will be here)"
                                className="edit-form__input"
                            />
                        </div>
                        <button className="waves-effect waves-light btn edit-btn">
                            Save changes
                        </button>
                    </form>
                </div>
            )}
            {showStory && (
                <div className="story-container">
                    {story.map((recipe) => (
                        <div className="story-card">
                            <div className="story-card__item">
                                Name: {recipe.name}
                            </div>
                            <div className="story-card__item">
                                Ingredients: {recipe.ingredients}
                            </div>
                            <div className="story-card__item">
                                Image: {recipe.image}
                            </div>
                            <div className="story-card__date">
                                {recipe.updated === undefined
                                    ? `Created ${recipe.createdAt}`
                                    : `Updated ${recipe.updated}`}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Recipe;