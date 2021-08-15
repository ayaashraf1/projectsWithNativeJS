/**
 * search for user
 * show and get data
 * API ==> https://api.github.com/users/
 * repos Api =>'https://api.github.com/users/' + username+"/repos"
 * user Example = florinpop17
 */

const ApiUrl = 'https://api.github.com/users/';
function getProfileOfUser(user){
    fetch(ApiUrl + user,{
       origin: "cors" 
    }).then(response => response.json()).then(data => displayData(data));
}
function getRepos(user){
    fetch(ApiUrl + user+"/repos",{
       origin: "cors" 
    }).then(response => response.json()).then(data => displayRepos(data));
}
function displayData(data){
    document.getElementById('cardContainer').style.display = 'block';
    document.getElementById('user-title').innerHTML = data.name;
    document.getElementById('avatarImg').src = data.avatar_url;
    document.getElementById('job-title').innerHTML = data.bio;
    const followDiv = document.getElementById('followData');
    followDiv.innerHTML = `
    <div>${data.followers}&nbsp;followers</div>
    <div>${data.following}&nbsp;following</div>
    <div>${data.public_repos}&nbsp;repo</div>
    `;    
}
function displayRepos(data){
 const repoDiv = document.getElementById('projectSecion');
 let repos = '';
 const splitArrOfData = data.slice(20);  //display only 10 repos
 splitArrOfData.forEach(element => {
     repos+=`<div id="${element.id}">${element.name}</div>`
 });
 repoDiv.innerHTML = repos;
}
 window.onload = function() {

    //apply logic with Enter press
     document.getElementById('search').addEventListener('keyup',function(event){
           if (event.keyCode === 13) {
            const user = document.getElementById('search').value;
            if(user === ''){
             document.getElementById('cardContainer').style.display = 'none';
             return;
            }
             getProfileOfUser(user);
             getRepos(user);
           }
       });
   
   };