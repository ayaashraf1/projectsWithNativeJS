/**
 * free database ==> https://www.themealdb.com/api.php
 * 
 **/

/*[to-do-list] 
1-search=>Done
2-render random meal=> Done
3-like meal and add to favourite =>Done
4-delete icon for each favourite meal =>DOne
5-when click on favourite meal ,popup appear with meal details =>Done
6- handle no favourite meal yet=>Done
*/

const searchBtn = document.getElementById('searchBtn');
const likeMealbtn = document.getElementsByClassName('fa-heart');

//Entry point
loadPage();

function addMealToListing(meal, isRandom) {
    const mealContainerDiv = document.createElement('div');
    mealContainerDiv.className = 'meal-container';
    mealContainerDiv.id = meal.idMeal;
    mealContainerDiv.innerHTML = `
    <img src="${meal.strMealThumb}" id="selectedImg" />`;
    if (isRandom) {
        mealContainerDiv.innerHTML += `<div id="recipe-details"><span id="random-flag">Random Recepie</span>
        <span id="selectedMealTit">${meal.strMeal}</span>
        <i class="fa fa-heart" onClick="likeMeal()"></i>
    </div>`;
    } else {
        mealContainerDiv.innerHTML += `<div id="recipe-details">
        <span id="selectedMealTit">${meal.strMeal}</span>
        <i class="fa fa-heart" onClick="likeMeal()"></i>
    </div>`;
    }
    document.getElementById('meals-box').append(mealContainerDiv);
}
function getRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            addMealToListing(data.meals[0], true);
        });


}
function loadPage() {
    getRandomMeal();
    getFavouriteMeal();
}
function likeMeal() {
    this.event.currentTarget.style.color = 'red';
    const mealId = this.event.currentTarget.parentElement.parentElement.id;
    debugger;
    setFavouriteMealToLS(mealId);
    getFavouriteMeal();
    this.event.currentTarget.parentElement.parentElement.remove();
    if(document.getElementById('search').value.trim().length == 0){
        document.getElementById('loading-meal').style.display = 'flex';
        setTimeout(()=>{
            getRandomMeal();
            document.getElementById('loading-meal').style.display = 'none';
        },1000);
    }
}
function setFavouriteMealToLS(newMealId) {
    let favMeal = getFavouriteMealFromLS();
    favMeal.push(newMealId);
    window.localStorage.setItem('favMealIds', JSON.stringify(favMeal));
}
function getFavouriteMealFromLS() {
    let favouriteMeal = JSON.parse(window.localStorage.getItem('favMealIds'));
    return favouriteMeal;
}
function getFavouriteMeal() {
    const favouriteMeal = getFavouriteMealFromLS();
    document.getElementById('fav-mealsWrapper').innerHTML='';
    if(favouriteMeal && favouriteMeal.length > 0){
        favouriteMeal.forEach(mealID => {
            fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealID)
                .then(response => response.json())
                .then(data => {
                    RenderFavouriteMeal(data.meals[0]);
                });
        });
    }else {
        const mealContainerDiv = document.createElement('div');
        mealContainerDiv.id = 'no-result';
        mealContainerDiv.innerHTML ='No Favourite Meal yet!';
        document.getElementById('fav-mealsWrapper').append(mealContainerDiv);
    }

}
function RenderFavouriteMeal(meal) {
    const mealContainerDiv = document.createElement('div');
    mealContainerDiv.className = 'fav-mealContainer';
    mealContainerDiv.id = meal.idMeal;
    mealContainerDiv.setAttribute("onclick","showMealDetails();");
    mealContainerDiv.innerHTML = `
        <img src="${meal.strMealThumb}" />
                <span>${meal.strMeal}</span><i class="fa fa-times" onClick="removeFromFavourite()"></i>`;

    document.getElementById('fav-mealsWrapper').append(mealContainerDiv);
}
function removeFromFavourite(){
    if(this.event.target.tagName.toLowerCase() == "i"){
        const mealID = this.event.currentTarget.parentElement.id;
        removeFavouriteMealFromLS(mealID);
    }
}
function removeFavouriteMealFromLS(id){
    const favMeals = getFavouriteMealFromLS();
    window.localStorage.setItem('favMealIds',JSON.stringify(favMeals.filter(m=>m !=id)));
    getFavouriteMeal();
}
function showMealDetails(){
    if(this.event.target.tagName.toLowerCase() == "img"){
    const mealID = this.event.currentTarget.id;
    getMealById(mealID).then(meal=>{
        console.log(meal);
        renderPopUpDetails(meal);
    });
}
}
function renderPopUpDetails(meal){
    const ingredients =  getIngredientWithQantity(meal);
    let ingredientLiEle = '';
    ingredients.forEach(ele=>{
        ingredientLiEle +=`<li> ${ele.qantity} ${ele.ingredient}</li>`;
    });
    const mealContainerDiv = document.createElement('div');
    mealContainerDiv.id ='popup-box';
    mealContainerDiv.innerHTML = `<i class="fa fa-times" onClick="closePopup()"></i>
     <h2>${meal.strMeal}</h2>
    <img src='${meal.strMealThumb}' />
    <div id="aboutMeal"> 
    <div><b>Youtube video link :</b><a href="${meal.strYoutube}"> Click Here</a></div><br/>
    <div><b>Meal Category :</b>${meal.strCategory}</div><br/>
    <div><b>Meal Area : </b>${meal.strArea}</div><br/>
    <div><b>Meal Ingredients :</b></div>
    <ul id="ingredient"> 
    ${ingredientLiEle}
    </ul></div>
    <div id="description"><b>Meal Instruction :</b> ${meal.strInstructions}</div>
   `;
    document.getElementById('popup').innerHTML = '';
    document.getElementById('popup').append(mealContainerDiv);
    document.getElementById('popup').classList.add('showPopup');
}
function getIngredientWithQantity(meal){
    let ingredients=[];
    for(let i=1;i<20;i++){
        if(meal['strIngredient'+i] != ""){
            ingredients.push({qantity:meal['strMeasure'+i],ingredient:meal['strIngredient'+i]});
        }
    }
    return ingredients;
}
function closePopup(){
    document.getElementById('popup').classList.remove('showPopup');
}
async function getMealById(id) {
    let meal = {};
   await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
        .then(response => response.json())
        .then(data => {
            meal =  data.meals[0];
        });
        return meal;
}
function searchForMeal(){
        const searchTxt = document.getElementById('search').value;
        if(searchTxt.trim().length > 0){
            fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchTxt)
                .then(response => response.json())
                .then(data => {
                    if (data.meals && data.meals.length > 0) {
                        document.getElementById('meals-box').innerHTML = '';
                        data.meals.forEach(meal => {
                            addMealToListing(meal, false);
                        });
                    }
                });
        }else {
            document.getElementById('meals-box').innerHTML = '';
            getRandomMeal();
        }
}