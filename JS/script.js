//Signup
async function signup(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirm-password').value;
    const country = document.getElementById('country').value;

    const user = {
        name:name,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        country: country,
    };

    fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

        .then(response => response.json())
        .then(responseUser => {
            sessionStorage.setItem("user", JSON.stringify(responseUser));
            console.log('Registration Successful');
            window.location.href = 'api.html';
        });

}

//Login
async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email,
        password
    };


    try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        console.log(data);
        const matchedUser = data.find(users => users.email === email && users.password === password);
        if (matchedUser) {
            sessionStorage.setItem("user", JSON.stringify(matchedUser));
            sessionStorage.setItem("islogin", "true");
            window.location.href = 'api.html';
        }

        else {
            alert('Please enter the correct user credentials!');
        }
    } catch (error) {
        console.error('Error', error);

        alert("Please try again later");

    }

}


//Logout
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}