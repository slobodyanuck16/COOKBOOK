const baseUrl = "https://5e97f8bc77f5430016339cb5.mockapi.io/api/v1/recipes";

export const createRecipe = recipeData => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(recipeData),
    })
    .then(response => {
        if(!response.ok) 
            throw new Error('Failed to create recipe');
    });
};

export const fetchRecipesList = () => {
    return fetch(baseUrl)
        .then(response => {
            if(response.ok)
                return response.json();
        })
        .then(recipesList => recipesList);
};

export const updateRecipe = (recipeId, recipeData) => {
    console.log(recipeData);
    
    return fetch(`${baseUrl}/${recipeId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(recipeData),
    })
    .then(response => {
        if (!response.ok)
            throw new Error('Failed to change status of recipe');
    });
};

export const deleteRecipe = (recipeId) => {
    return fetch(`${baseUrl}/${recipeId}`, {
        method: "DELETE"
    })
    .then(response => {
        if(!response.ok) 
            throw new Error('Failed to delete recipe');
    });
};