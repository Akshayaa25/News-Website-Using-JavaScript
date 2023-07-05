document.addEventListener("DOMContentLoaded", function () {
    const update = document.getElementById('update');
    const modalContainer = document.getElementById('modalContainer');
    const closeBtn = document.getElementById('closeBtn');
    const modalOverlay = document.getElementById('modalOverlay');

    update.addEventListener('click', function () {
        modalContainer.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });

    modalOverlay.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });

    var user = JSON.parse(sessionStorage.getItem("user"));

    console.log(user);

    if (user) {
        document.getElementById("name").textContent = user.name;
        document.getElementById("email").textContent = user.email;
        document.getElementById("country").textContent = user.country;
    }

    document.getElementById('u-name').value = user.name;
    document.getElementById('u-email').value = user.email;
    document.getElementById('u-country').value = user.country;

    var saveButton = document.getElementById("save");

    saveButton.addEventListener("click", function (event) {
        event.preventDefault();

        var id = user.id;
        var name = document.getElementById('u-name').value;
        var email = document.getElementById('u-email').value;
        var country = document.getElementById('u-country').value;

        var updateUser = Object.assign({}, user);

        updateUser.name = name;
        updateUser.email = email;
        updateUser.country = country;

        fetch("http://localhost:3000/users/" + user.id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser),
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("Update failed");
                }
            }).then(function (responseUser) {
                user = responseUser;
                alert("Updated successfully");
                modalContainer.style.display = 'none';
                document.getElementById("name").textContent = user.name;
                document.getElementById("email").textContent = user.email;
                document.getElementById("country").textContent = user.country;

            }).catch(function (error) {
                console.log(error);
            })

    });

    var deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", function () {
        confirmation = confirm("Are you sure want to delete the user?");
        if (confirmation) {
            var id = user.id;
            fetch("http://localhost:3000/users/" + id, {
                method: "DELETE",
            })
                .then(function (response) {
                    if (response.ok) {
                        sessionStorage.clear();
                        alert("Deleted successfully");
                        window.location.href = "index.html";
                    }
                    else {
                        throw new Error("User is not deleted");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Error");
                });
        }
    });

    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", function () {
        var resetModalContainer = document.getElementById("modalContainer-2");
        var resetCloseBtn = document.getElementById("closeBtn-2");
        var resetModalOverlay = document.getElementById("modalOverlay-2");

        resetModalContainer.style.display = "flex";

        resetCloseBtn.addEventListener("click", function () {
            resetModalContainer.style.display = "none";
        });

        resetModalOverlay.addEventListener("click", function () {
            resetModalContainer.style.display = "none";
        });

        var resetForm = document.getElementById("resetForm");

        resetForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var currentPassword = document.getElementById("c-password").value;
            var newPassword = document.getElementById("n-password").value;
            var confirmPassword = document.getElementById("cn-password").value;

            if (currentPassword !== user.password) {
                alert("Current password is not correct");
                return;
            }
            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match");
                return;
            }

            var resetUser = Object.assign({}, user);

            resetUser.password = newPassword;
            resetUser.confirmpassword = confirmPassword;

            fetch("http://localhost:3000/users/" + user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resetUser),
            })
                .then(function (response) {
                    if (response.ok) {
                        alert('Password reset successfully.');
                        resetModalContainer.style.display = "none";
                        // resetForm.reset();
                        return response.json();
                    } else {
                        throw new Error("Password update failed");
                    }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

    });
});
