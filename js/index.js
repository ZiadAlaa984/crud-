// ^ HTML elements 
const inputName = document.getElementById("site_Name");
const inputUrl = document.getElementById("Site_Url");
let search = document.getElementById("search");
const btn = document.getElementById("btn");
const btn_Update = document.getElementById("btn_Update");
const btn_Submit = document.getElementById("btn_Submit");
const btnVisit = document.getElementById("btn_visit");
const btnDelete = document.getElementById("btn_delete");
const btnUpdate= document.getElementById("btn_update");
const container = document.getElementById("tbody");

// ^ Variables
let list = JSON.parse(localStorage.getItem('list')) || [];
let currentIndex = -1;

const nameRegex = /^[A-Z][a-z0-9\s]+( [A-Z][a-z0-9\s]+)*$/;
const urlRegex = /^http(s)?:\/\/(www\.)?[a-zA-Z0-9@&:%._\+#=-]{2,}\.[a-z]{2,}/;
console.log(list);
displayAllData();

// * Functions
// ^ Add data, localStorage, clearInput, remove, update, validation, search
function addData() {
    if (checkInputsEmpty()) {
        alert('NameSite or UrlSite Is Empty');
    } else {
        if (validation(nameRegex, inputName) && validation(urlRegex, inputUrl)) {
            let site = {
                nameSite: inputName.value,
                urlSite: inputUrl.value
            };
            list.push(site);
            localStorage.setItem('list', JSON.stringify(list));
            displayData(list.length - 1);
            clearInputs();
        } else {
            alert('Data not correct');
        }
    }
}
function updateData(index) {
    btn_Update.classList.remove('d-none');
    btn_Submit.classList.add('d-none');
    inputName.value = list[index].nameSite;
    inputUrl.value = list[index].urlSite;
    currentIndex = index;
}
function UpdateCheck() {
    if (currentIndex !== -1) {
        if (validation(nameRegex, inputName) && validation(urlRegex, inputUrl)) {
            let site = {
                nameSite: inputName.value,
                urlSite: inputUrl.value
            };
            list[currentIndex] = site;
            localStorage.setItem('list', JSON.stringify(list));
            
            clearInputs();
            container.innerHTML = '';
            displayAllData();

            btn_Update.classList.add('d-none');
            btn_Submit.classList.remove('d-none');
            currentIndex = -1;
        } else {
            alert('Data not correct');
        }
    }
}

function displayData(index) {
    let row = `
        <tr>
            <td data-label="Index">${index}</td>
            <td data-label="Name">${list[index].nameSite}</td>
            <td data-label="Visit">
                <a href="${list[index].urlSite}" target="_blank">
                    <button type="button" id="btn_visit" class="btn btn-success">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </a>
            </td>
            <td data-label="Delete">
                <button type="button" onclick="deleteSite(${index})" id="btn_delete" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
            <td data-label="Update">
                <button type="button" onclick="updateData(${index})" id="btn_update" class="btn btn-warning text-white">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
            </td>
        </tr>
    `;
    container.innerHTML += row;
}

function displayAllData() {
    for (let index = 0; index < list.length; index++) {
        displayData(index);
    }
}

function clearInputs() {
    inputName.value = '';
    inputUrl.value = '';
}

function checkInputsEmpty() {
    return inputName.value == '' || inputUrl.value == '';
}

function deleteSite(index) {
    list.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(list));
    container.innerHTML = '';
    displayAllData();
}

function validation(regex, input) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
function SearchData() {
    container.innerHTML = "";
    let term = search.value;
        for (let x = 0; x < list.length; x++) {
        if (list[x].nameSite.toLowerCase().includes(term.toLowerCase())) {
            displayData(x);
        }
    }
}
// Event listener for the update button
btn_Update.addEventListener('click', UpdateCheck);