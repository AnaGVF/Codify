const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

logInButton.addEventListener('click', () => {

	username = document.getElementById("emailIn").value;
	password = document.getElementById("passwordIn").value;

	$.ajax({
		method: "POST",
		url: "http://localhost:8000/token-login/",
		data: {
			username: username,
			password: password,
		},
		success: function(data){
			alert(data.token);
			alert(data.user);
			window.location = "/index";
		},
		
	});
});