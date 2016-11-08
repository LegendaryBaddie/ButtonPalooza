$(document).ready(() => {
    
     const handleError = (message) => {
        $("#errorMessage").text(message);
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
   
    let user = $.ajax("/user");
    
    if(user.account.username !== "")
    {
         $("#login").html(`<p> Welcome ${user.account.username}! </p>`)
    }else{
        $("#login").html(
            `<form id="loginForm" name="loginForm" action="/login" method="POST" class="mainForm">
                <label for="username">Username: </label>
                <input id="user" type="text" name="username" placeholder="username"/>
                <label for="pass">Password: </label>
                <input id="pass" type="password" name="pass" placeholder="password"/>
                <a id="loginSubmit" href="#" class="formSubmit">Sign in</a>
            </form>`
        );
    }
    $("#signupSubmit").on("click", (e) => {
        e.preventDefault();
    
        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }
        
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

    $("#loginSubmit").on("click", (e) => {
        e.preventDefault();
    
        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("Username or password is empty");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
   
});