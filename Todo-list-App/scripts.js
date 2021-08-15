/**
 * todo list app
 * crud operation add - edit and delete todo note  =>Done
 * delete if clicked on completed task =>Done
 * save and delete from local storage  =>Done
 */


function addNewTodo(ele = ''){
 let todoTxt = (ele=='' ? this.event.target.value : ele.todoTxt);
 ele=='' ?  this.event.target.value = '' : '';

 let todoList = document.getElementById('todo-list');
 let newli = document.createElement('li');
 const id  =generateUniqueId();
 newli.innerText = (ele=='' ? todoTxt: ele.todoTxt);
 newli.id = (ele=='' ? id: ele.id);
 newli.className = ele.completed?'completed':'';
 newli.innerHTML += "<i class='fa fa-edit'></i>";
 newli.onclick = ()=>{
   removeTodo();
  }
  const liForEdit = document.createElement('li');
  liForEdit.innerHTML = "<input type='text' value='' class='inputTxt' />";
  liForEdit.className = "hide editMode";

  const editIcons = newli.querySelector('.fa');
  editIcons.addEventListener('click',()=>{
    editTodo();
  });

  editInput = liForEdit.querySelector('.inputTxt');
  editInput.addEventListener('keydown',(e)=>{
    saveUpdate(e);
  })

 todoList.append(newli);
 todoList.append(liForEdit);
 if(ele == ''){
   addToLS({id,todoTxt,completed:false});
 }
}

function editTodo(){
  if(this.event.target.tagName.toLowerCase() == 'i'){
    this.event.currentTarget.parentElement.classList.toggle('hide');
    this.event.currentTarget.parentElement.nextElementSibling.classList.toggle('hide');
    this.event.currentTarget.parentElement.nextElementSibling.children[0].value = this.event.currentTarget.parentElement.innerText;   
  }
}
function saveUpdate(e){
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { //Enter keycode
    this.event.currentTarget.parentElement.classList.toggle('hide');
    this.event.currentTarget.parentElement.previousSibling.classList.toggle('hide');
    this.event.currentTarget.parentElement.previousSibling.innerHTML=this.event.currentTarget.value+"<i class='fa fa-edit'></i>";
    const id = this.event.currentTarget.parentElement.previousSibling.id;
    const editIcons = this.event.currentTarget.parentElement.previousSibling.querySelector('.fa');
    editIcons.addEventListener('click',()=>{
      editTodo();
    });
    saveUpdateInLS(id,this.event.currentTarget.value);
   }
}
function saveUpdateInLS(id,newVal){
  let todos = getTodoFromLs();
  todos.forEach(element => {
    if(element.id == id){
      element.todoTxt = newVal;
    }
  });
  window.localStorage.setItem('toDos',JSON.stringify(todos));
}

function removeTodo(){
  if(this.event.target.tagName.toLowerCase() == 'li'){
  const id = this.event.currentTarget.id;
  if(this.event.currentTarget.classList[0] != "completed"){
    this.event.currentTarget.classList.add('completed');

    let todos = getTodoFromLs();
    todos.forEach(t=>{
     if(t.id == id){
       t.completed = true;
     }
    });
    window.localStorage.setItem('toDos',JSON.stringify(todos));
  }else {
    this.event.currentTarget.remove();
    removeFromLS(id);
  }
}
}
function generateUniqueId(){
  return Math.floor(Math.random() * 100);
}
function addToLS(todoObj){
  let todos = getTodoFromLs();
  if(todos){
    todos.push(todoObj);
  }else{
    todos = [todoObj];
  }
  window.localStorage.setItem('toDos',JSON.stringify(todos));
}
function getTodoFromLs(){
  return JSON.parse(window.localStorage.getItem('toDos'));
}
function removeFromLS(id){
  const todos = getTodoFromLs();
  window.localStorage.setItem('toDos',JSON.stringify(todos.filter(e=>e.id != id)));
}
function loadPage(){
  document.getElementById('todo-list').innerHTML = '';
  const todos = getTodoFromLs();
  if(todos){
    todos.forEach(element => {
      addNewTodo(element);
    });
  }
}
loadPage();