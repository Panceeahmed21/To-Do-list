var formInput = document.getElementById("inputTodo");
var addBtn =document.getElementById('addID')
var saveBtn  =document.getElementById('saveID')

var list = [];
var taskItem;
var index;
if (localStorage.getItem("task") != null) {
  list = JSON.parse(localStorage.getItem("task"));
  displayList(list);
}

function addTask() {
  if (checkInput() == true) {
    var inputValue = {
      formInput: formInput.value,
    };
    list.push(inputValue);
    localStorage.setItem("task", JSON.stringify(list));
    displayList(list);
    clearForm();
  }
}

function displayList(list) {
  var cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `

    <tr>
    <td>${i + 1}</td>
    <td class="max-width">${list[i].formInput}</td>
    <td> In progress</p></td>
    <td>
        <button class="btn bg-danger text-white deleteBtn" onclick="deleteTask(${i})">Delete</button>
        <button class="btn bg-success text-white " onclick="getUpdate(${i})">Edit</button>
        <button class="btn bg-success text-white d-none ">Save</button>


    </td>       
    </tr>
`;
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function getUpdate(i) {
  addBtn.classList.add("d-none");
  saveBtn.classList.replace("d-none", "d-block")
  index = i;
  updatedFormValues(list[index]);
//list[index] = key : value
}

function updatedFormValues(flag) {
  formInput.value = flag ? flag.formInput : "";
}
function updatedTasks() {
  var formInput = document.getElementById("inputTodo");
  var formInput = {
    formInput: formInput.value,
  };
  list[index] = formInput;
  localStorage.setItem("userTask", JSON.stringify(list));
  displayList(list);
  addBtn.classList.replace("d-none", "d-block");
  saveBtn.classList.replace("d-block", "d-none");
  updatedFormValues();
}

function clearForm() {
  formInput.value = "";
}

function checkInput() {
  var inputValueEntered = formInput.value;
  var regex = /^[A-Za-z0-9 ]{3,}$/;
  if (regex.test(inputValueEntered) == true) {
    document.getElementById("check").classList.add("d-none");
    return true;
  } else {
    document.getElementById("check").classList.remove("d-none");
    return false;
  }
}

function deleteTask(i) {
  list.splice(i, 1);
  localStorage.setItem("task", JSON.stringify(list));

  displayList(list);
}
function clearAll() {
  localStorage.removeItem("task");
  list = [];
  displayList(list);
}
