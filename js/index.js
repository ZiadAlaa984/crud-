// ^ html elements 
const inputName = document.getElementById("site_Name");
const inputUrl = document.getElementById("Site_Url");
let search = document.getElementById("search");
const btn = document.getElementById("btn");
const btnVisit = document.getElementById("btn_visit");
const btnDelete = document.getElementById("btn_delete");
const container = document.getElementById("tbody");
// ^ variables
let list = JSON.parse(localStorage.getItem("link")) || [];
const nameRegex = /^[A-Z][a-z0-9\s]+( [A-Z][a-z0-9\s]+)*$/
const urlRegex = /^http(s)?:\/\/(www\.)?[a-zA-Z0-9@&:%._\+#=-]{2,}\.[a-z]{2,}/;
// ^ function
displayDataAll()
function displayData(index) {
    let htmlText = `
                <tr>
                <td scope="row">${index}</td>
                <td>${list[index].nameSite}</td>
                <td>
                    <a href="${list[index].urlSite}" target="_blank"><button type="button" id="btn_visit"
                            class="btn btn-success"><i class="fa-solid fa-eye "></i></button></a>
                </td>
                <td><button type="button" onclick="deleteSite(${index})" id="btn_delete" class="btn btn-danger "><i
                            class="fa-solid fa-trash-can"></i></button></td>
            </tr>`
    container.innerHTML += htmlText;
}
function displayDataAll() {
    for (let i = 0; i < list.length; i++) {
        displayData(i);
    }
}
function clearInput() {
    inputName.value = "";
    inputUrl.value = "";
}
function validation(regex, input) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.add("d-none");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
function deleteSite(index) {

    list.splice(index, 1);
    container.innerHTML = "";
    displayDataAll();
    localStorage.setItem("link", JSON.stringify(list));
}
function searchSite() {
    container.innerHTML = "";
    let term = search.value;
    for (let x = 0; x < list.length; x++) {
        if (list[x].nameSite.toLowerCase().includes(term.toLowerCase())) {
            displayData(x);
        }
    }
}
// ^ event
btn.addEventListener("click", function () {
    if (validation(nameRegex, inputName) == true && validation(urlRegex, inputUrl) == true) {
        let site = {
            nameSite: inputName.value,
            urlSite: inputUrl.value
        }
        list.push(site);
        localStorage.setItem("link", JSON.stringify(list));
        console.log(list);
        displayData(list.length - 1);
        clearInput();
    }
    else {
        window.alert("8lt");
    }
})
