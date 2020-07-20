import React, { Component } from "react";

const defaultFormState = {
    name: "Dish without title (edit and add title)",
    ingredients: "Dish without ingredients, (edit and add some ingredients)",
    image: "https://wallpaperaccess.com/full/271679.jpg",
};

class CreateRecipeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: defaultFormState,
        };
    }

    createEventObj = (e) => {
        e.preventDefault();

        if (Object.values(this.state.form).some((el) => el === "")) {
            console.log("no values");
            return;
        }

        this.props.onCreate(this.state.form);
        this.clearForm(); // try to commit
        this.hidePopup();
    };

    hidePopup = () => {
        this.props.showCreate();
    };

    inputHandler = (e) => {
        const { name, value } = e.target;

        this.setState({
            form: {
                ...this.state.form,
                [name]: value,
            },
        });
    };

    clearForm = () => {
        this.setState({
            form: defaultFormState,
        });
    };

    render() {
        return (
            <div className="recipe-modal">
                <div className="recipe-modal__content">
                    <div className="create-event">
                        <form
                            className="event-form"
                            // onSubmit={this.createEventObj}
                        >
                            <div className="event-form__container">
                                <div className="event-form__item">
                                    Name{" "}
                                    <input
                                        onChange={this.inputHandler}
                                        type="text"
                                        className="event-form__item_input"
                                        name="name"
                                        placeholder="Wtite the name of your dish"
                                    />
                                </div>
                                <div className="event-form__item">
                                    {
                                        "Ingredients ( put commas to get a list :) )"
                                    }

                                    <input
                                        onChange={this.inputHandler}
                                        name="ingredients"
                                        placeholder="Write some ingredients"
                                        className="event-form__item_input"
                                        type="text"
                                    ></input>
                                </div>
                                <div className="event-form__item">
                                    Image
                                    <input
                                        onChange={this.inputHandler}
                                        type="text"
                                        name="image"
                                        className="event-form__item_input"
                                        placeholder="Enter image URL of your dish (or our standard picture will be here)"
                                    />
                                </div>
                            </div>
                        </form>
                        <button
                            type="submit"
                            className="waves-effect waves-light btn"
                            onClick={this.createEventObj}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateRecipeInput;
