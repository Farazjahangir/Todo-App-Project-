var userEmail = document.getElementById('email')
var userName = document.getElementById('username');
var userPassword = document.getElementById('password');
var confirmPassowrd = document.getElementById('password2');
var dateOfBirth = document.getElementById('dob');
var signUp = document.getElementById("sign-up");
var message = document.getElementById('message');
var loader = document.getElementById('loader');

signUp.addEventListener('click' , ()=>{
    if(userPassword.value !== confirmPassowrd.value){
        message.innerText = "Passwords are not same"
        loader.innerText = ""
        userPassword.value = ""
        confirmPassowrd.value = ""
    }
    else if(userName.value != "" && userPassword.value != "" && dateOfBirth.value != ""){
        auth.createUserWithEmailAndPassword(userEmail.value , userPassword.value)
        .then( (snapShot)=>{
            usersData = {
                name : userName.value,
                email : userEmail.value,
                dob : dateOfBirth.value
            }
            database.ref(`users/${snapShot.user.uid}`).set(usersData);
            userUid = snapShot.user.uid
            localStorage.setItem('userUid' ,JSON.stringify(userUid))
            window.location.assign('todos.html')
        })
        .catch((err)=>{
            message.innerText = err.message;
            loader.innerText = ""
            userPassword.value =""
            confirmPassowrd.value =""
            userEmail.value = ""
        })     
        loader.innerText = "User Creating..."
    }
    else{
        console.log("else")        
        message.innerText = "Please Fill All The Fields Above"
    }  
})