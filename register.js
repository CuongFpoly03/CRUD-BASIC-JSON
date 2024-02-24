const form = document.getElementById("forms");
const registerUser = async (e) => {
    e.preventDefault();
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (!email || !username || !password) {
    alert("Please provide email, username, and password.");
    return;
  }
  let newUser = {
    email,
    username,
    password,
  };

  try {
    const res = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    console.log(data);
    localStorage.setItem("authToken", "someAuthToken");
    window.location.href = "http://127.0.0.1:5500/login.html";
    alert("thêm tài khoản thành công!");
  } catch (error) {
    console.log(error);
  }
};
form.addEventListener("submit", registerUser);
