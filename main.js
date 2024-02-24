const API = "http://localhost:8000/product";
const tbody = document.getElementById("tbody");
const formsubmit = document.getElementById("formsubmit");
let edit = null;
const getAllPro = async () => {
  const res = await fetch(API);
  const data = await res.json();
  tbody.innerHTML = "";
  data.forEach((pro) => {
    const create = document.createElement("tr");
    create.innerHTML = `
        <tr>
        <th scope="row">${pro.id}</th>
        <td>${pro.name}</td>
        <td>${pro.price}</td>
        <td><img src="${pro.imgs}" /></td>
        <td>${pro.quantity}</td>
        <td>
            <button onclick="delPro('${pro.id}')" class="btn btn-danger">Del</button>
            <button onclick="editPro('${pro.id}')" class="btn btn-success">Edit</button>
        </td>
      </tr>
        `;
    tbody.appendChild(create);
  });
  console.log(data);
};
//edit and update
const both = async (api, method, data) => {
  try {
    const res = await fetch(api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dt = await res.json();
    console.log(dt);
    getAllPro();
    formsubmit.reset();
    edit = null;
  } catch (error) {
    console.log(error);
  }
};

const validate = (name, price, quantity) => {
  if (!name || !price || !quantity) {
    document.getElementById("errAll").innerHTML = "vui lòng nhập thông tin !";
    return false;
  }
  if (name.length <= 5) {
    document.getElementById("errName").innerHTML = "vui lòng nhập hơn 5 kí tự";
    return false;
  }
  if (isNaN(price) || price <= 5) {
    document.getElementById("errPrice").innerHTML = "vui lòng nhập lớn hơn 5";
    return false;
  }
  return true;
};
//add product
const addPro = async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imgs = document.getElementById("imgs").value;
  const quantity = document.getElementById("quantity").value;
  if (!validate(name, price, quantity)) {
    return;
  }
  const newdb = {
    id,
    name,
    price,
    imgs,
    quantity,
  };
  const api = edit ? `${API}/${edit}` : API;
  const method = edit ? "PUT" : "POST";

  try {
    await both(api, method, newdb);
    alert("thành công !");
  } catch (error) {
    console.log(error);
  }
};

const editPro = async (idd) => {
  edit = idd;
  try {
    const res = await fetch(`${API}/${idd}`);
    const { name, price, imgs, quantity } = await res.json();
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("imgs").value = imgs;
    document.getElementById("quantity").value = quantity;
  } catch (error) {
    console.log(error);
  }
};

const delPro = async (idd) => {
  const cf = confirm("bạn muốn xoá không");
  if (cf) {
    await fetch(`${API}/${idd}`, {
      method: "DELETE",
    });
  }
  alert("bạn đã xoá thành công");
};
formsubmit.addEventListener("submit", addPro);
getAllPro();

const Logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "http://127.0.0.1:5500/login.html";
  alert("Bạn đã đăng xuất thành công!");
};

