const Login = async(e) => {
    e.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const ktra = await checkUser(username, password);
    const text = document.getElementById("errAll");

    if (ktra) {
        text.innerHTML = "Đăng nhập thành công!";
        const token = "someAuthToken";
        localStorage.setItem("authToken", token);
        window.location.href = "http://127.0.0.1:5500/index.html";
        alert("Đăng nhập thành công");
    } else {
        text.innerHTML = "Bạn đã nhập sai mật khẩu và tài khoản";
    }
}

const checkUser = async(username, password) => {
    const res = await fetch("http://localhost:8000/user?username=" + username);
    const user = await res.json();
    console.log(user)
    let check = false;
    if (user.length > 0 && user[0].password === password) {
        check = true;
    }
    return check;
}

const Logins = async(e) => {
    e.preventDefault();
    const username = document.querySelector('input[name = "username"]').value;
    const password = document.querySelector('input[name = "password"]').value;
    const test = await checkuser(username, password);
    const text = document.getElementById("error");
    if(test) {
        text.innerHTML = "đăng nhập thành công";
        localStorage.setItem("authToken", "someAuthToken");
        window.location.href = "";
        alert("đăng nhập thành công");
    }else {
        text.innerHTML='vui lòng nhập lại thông tin sau'
    }
}
const checkuser = async(username, password) => {
    const res = await fetch("http://localhost:8000/user?username="+username);
    const data = await res.json();
    let check = false;
    if(data.length > 0 && data[0].password === password){
        check = true;
    }
}