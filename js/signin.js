var email = document.getElementById('email');
var password = document.getElementById('password');
var signIn = document.getElementById('sign-in');
var message = document.getElementById('message')

signIn.addEventListener('click' ,()=>{
    loader.innerText = "Please Wait Logging In"
    if(email.value !== "" && password.value !== ""){   
        auth.signInWithEmailAndPassword(email.value , password.value)
        .then( (snapShot)=>{
            console.log(snapShot)
            userUid = snapShot.user.uid
            localStorage.setItem('userUid' , JSON.stringify(userUid))
            localStorage.setItem("user" , JSON.stringify("true"))
            window.location.assign("todos.html")
            
        })
        .catch((err)=>{
            message.innerText = err.message;
            loader.innerText = ""
            email.value = ""
            password.value = ""
        })
    }
    else{
        message.innerText = "Please Fill All The Above Fields"
        loader.innerText = ""
    }
})
