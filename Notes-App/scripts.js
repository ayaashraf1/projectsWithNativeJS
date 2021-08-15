/**
 * todo list
 * 1-design of node =>Done
 * 2-crud [add-delete-edit] =>Done
 * 3-save notes in local storage and delete from it in case delete Note =>Done
 * 4-when open new note textArea will be displayed and vice versa if diplayed note when load page =>Done
 */


document.getElementById('addBtn').addEventListener('click',()=>{
    addNewNote();
});

function addNewNote(node=''){
    const id = generateUniqueId();
    const noteContainer = document.createElement('div');
    noteContainer.className = 'note-box';
    noteContainer.id = (node==''?id:node.id);
    noteContainer.innerHTML = `<div class="header">
    <i class="fa fa-edit ${(node==''?'active':'')} "></i>
    <i class="fa fa-trash"></i>
       </div>
       <div class="note-content">
           <textarea class="note-edit ${(node==''?'':'hide')}">${(node==''?'':node.text)}</textarea>
           <div class="note-view ${(node==''?'hide':'')}">${(node==''?'':node.text)}</div>
       </div></div>`;

       const editBtn = noteContainer.querySelector('.fa-edit');
       const deleteBtn = noteContainer.querySelector('.fa-trash');
       const textArea = noteContainer.querySelector('.note-edit');
       const noteViewDiv = noteContainer.querySelector('.note-view');


       editBtn.addEventListener('click',()=>{
         textArea.classList.toggle('hide');
         noteViewDiv.classList.toggle('hide');
         editBtn.classList.toggle('active');
       });

       deleteBtn.addEventListener('click',()=>{
        const noteID = noteContainer.id;
        noteContainer.remove();
        removeNoteFromLS(noteID);
       });

       textArea.addEventListener('input',(e)=>{
         const {value} = e.target;
         noteViewDiv.innerText = value;
         saveAllNotesToLS();
       })

       document.body.appendChild(noteContainer);
}
 function generateUniqueId(){
    return Math.floor(Math.random() * 100);
 }
 function saveAllNotesToLS(){
     const notes = document.querySelectorAll('.note-box');
     const notesArr = [];
    if(notes.length > 0){
      notes.forEach(element => {
        notesArr.push({id:element.id,text:element.children[1].children[1].innerText});
      });
     window.localStorage.setItem('notes', JSON.stringify(notesArr));
    }
 }
 function getNotesFromLS(){
    let Notes = JSON.parse(window.localStorage.getItem('notes'));
    return Notes;
 }
function removeNoteFromLS(id){
   const notes = getNotesFromLS();
   window.localStorage.setItem('notes',JSON.stringify(notes.filter(n=>n.id != id)));
}

 function load(){
    const notes = getNotesFromLS();
    if(notes){
        notes.forEach(element => {
            addNewNote(element);
        });
    }
 }


 //Entry Point
 load();