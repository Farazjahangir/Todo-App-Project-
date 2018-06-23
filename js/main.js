
// Firebase Init
var config = {
    apiKey: "AIzaSyD2NH3hfmk6kwMlZIX5VW8Q-PMl34LLFHk",
    authDomain: "login-page-12.firebaseapp.com",
    databaseURL: "https://login-page-12.firebaseio.com",
    projectId: "login-page-12",
    storageBucket: "login-page-12.appspot.com",
    messagingSenderId: "409825487939"
  };
  firebase.initializeApp(config);
// ************************************************ //

var auth = firebase.auth();
var database = firebase.database();
var userTodo = document.getElementById('input-field');
var listEl = document.getElementById("list");
var userUid; // For User Uid
var data; // For Data From Firebase
var node;
var editedText; 
var todoKey;
var prevText;

// To Check user login or logout
auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("user signed in")
  } else {
    console.log("user signed out");
    localStorage.removeItem("user")   
  }
});
// Function To Add Todo
function addTask(){
   database.ref(`todos/${userUid}`).push(
    {todo : userTodo.value,
    isDone : false
    }
  ).key
  userTodo.value = ""
}


// if(localStorage.getItem("user")!== null){
//   if(window.location.pathname !== "/todos.html"){
//     window.location.assign('todos.html')
//   }
// }
// else{
//   if(window.location.pathname === "/todos.html"){
//     window.location.assign("index.html")
//   }
// }


// Function To Get Todos On DOM
function getTodos(){
  userUid = JSON.parse(localStorage.getItem("userUid"))
  database.ref(`todos/${userUid}`).on('child_added' , (snapshot)=>{
    data = snapshot.val();
    todoKey = snapshot.key;
    if(data.isDone){
      listEl.innerHTML += `
      <li  class="todos">
        <div class="line-through text">${data.todo}</div>
        <div>
          <img src="icons/garbage.svg"  alt="garbage" onClick="deleteTodo(this,'${todoKey}')">
        </div>
      </li>  
      `
    }
    else{
      listEl.innerHTML += `
      <li  class="todos">
        <div class="text">${data.todo}</div>
        <div>
          <img src="icons/garbage.svg"  onClick="deleteTodo(this,'${todoKey}')">
          <img src="icons/new-file.svg" class="remove-btn" onClick="editText(this , '${todoKey}')">
          <img src="icons/success.svg" class="remove-btn" onClick="mark(this , '${todoKey}')">
  
        </div>
      </li>
    `      
      }
  })
}


// Edit Text Function
function editText(el , key){
  node = el.parentNode.parentNode  
  prevText = node.childNodes[1].innerText
  node.innerHTML = `
  <input type="text" class="form-control" id="edited-text">
  <input type="button" value="Update" class="btn btn-info" onClick="doneFunc(this , '${key}')">
  `
  editedText = document.getElementById("edited-text");  
}


// Value Update Function
function doneFunc(ref , key){
  liRef = ref.parentNode;ref.parentNode;
  liRef2 = ref.parentNode.childNodes;
  for(var i=0; i < liRef2.length;){
    liRef.removeChild(liRef2[i]); 
  }
  if(editedText.value === ""){
    liRef.innerHTML += `
    <div class="text">${prevText}</div>
    <div>
          <img src="icons/garbage.svg"  onClick="deleteTodo(this,'${todoKey}')">
          <img src="icons/new-file.svg" class="remove-btn" onClick="editText(this , '${todoKey}')">
          <img src="icons/success.svg" class="remove-btn" onClick="mark(this , '${todoKey}')">
    </div>
  
    `  
  }
  else{
    console.log("else")    
  liRef.innerHTML += `
  <div class="text">${editedText.value}</div>
  <div>
        <img src="icons/garbage.svg"  onClick="deleteTodo(this,'${todoKey}')">
        <img src="icons/new-file.svg" class="remove-btn" onClick="editText(this , '${todoKey}')">
        <img src="icons/success.svg" class="remove-btn" onClick="mark(this , '${todoKey}')">
  </div>

  `
  database.ref(`todos/${userUid}/${key}`).update({
    todo : editedText.value
  })
}
}


function mark(el , key){
  database.ref(`todos/${userUid}/${key}`).update({
    isDone : true
  })
  var li = el.parentNode;
  var liBtns = li.querySelectorAll('.remove-btn')
  markTodo = el.parentNode.parentNode.childNodes[1];
  li.removeChild(liBtns[0])
  li.removeChild(liBtns[1])  
  markTodo.className = "line-through" 
}

// Delete All The Data
function deleteAll(){
  database.ref(`todos/${userUid}`).remove();
  deleteAllData = listEl.childNodes;
  for(var i=0; i < deleteAllData.length;){
    listEl.removeChild(deleteAllData[i]);
  }
}

// Delete Single Todo
function deleteTodo(elm,key){
  singleTodo = elm.parentNode.parentNode;
  listEl.removeChild(singleTodo);
  database.ref(`todos/${userUid}/${key}`).remove();
}

// Function To Empty Text Fields
function emptyField(){
  message.innerText = " "
}

// SignOut Function
function signOut(){
  auth.signOut()
    .then( ()=>{
      window.location.assign("index.html")
    })
  localStorage.removeItem('userUid')
  localStorage.removeItem("user")
}
  