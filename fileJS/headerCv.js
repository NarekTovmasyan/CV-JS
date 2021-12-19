import { members } from "./data.js"

// let storedData = getJson(checktrainees); /*stugum enq ardyoq menq json enq stacel javaic te voch */

// function getJson(item) {
//     debugger;
//     try {
//         item = JSON.parse(item);
//     } catch (e) {
//         return false;
//     }

//     if (typeof item === "object" && item !== null) {
//         return item;
//     }

//     return false;
// } /*stugum enq ardyoq menq json enq stacel javaic te voch */

const trainees = getFromStorage("users") || saveToStorage(members);

function initGridList() {
    let box = document.querySelector(".cv");
    box.innerHTML = `<div class="item">
    <div class="newBox">
    <a href="#addNewCV" class="cv_link">
    <span>+Add new person</span>
    </a>
    </div>`;
    trainees.forEach(cv => {
        box.innerHTML += `<div class="item"><a href="#personPage?id=${cv.id}">${cv.firstName} ${cv.lastName}</a></div>`;
    })
}

window.onload = () => { generateInitialPage() };

window.addEventListener("hashchange", function() {
    generateInitialPage();
});

function generateInitialPage() {
    let cvList = document.querySelector("#cv-list"); //ete liner getElementByID(cv-list) aranc # sra
    let personalPage = document.querySelector("#cv-page");
    let contactPage = document.querySelector("#contact-us-page");
    let about = document.querySelector("#about-page");
    let addNewCV = document.querySelector("#add-new")
    let hash = window.location.hash;
    switch (hash) {
        case "":
            cvList.classList.add("hidden");
            personalPage.classList.add("hidden");
            contactPage.classList.add("hidden");
            about.classList.add("hidden");
            addNewCV.classList.add("hidden");
            break;
        case "#cvPage":
            initGridList();
            cvList.classList.remove("hidden");
            personalPage.classList.add("hidden");
            contactPage.classList.add("hidden");
            about.classList.add("hidden");
            addNewCV.classList.add("hidden");
            break;
        case "#contactUs":
            cvList.classList.add("hidden");
            personalPage.classList.add("hidden");
            contactPage.classList.remove("hidden");
            about.classList.add("hidden");
            addNewCV.classList.add("hidden");
            break;
        case "#about":
            cvList.classList.add("hidden");
            personalPage.classList.add("hidden");
            contactPage.classList.add("hidden");
            about.classList.remove("hidden");
            addNewCV.classList.add("hidden");
            break;
        case "#addNewCV":
            cvList.classList.add("hidden");
            personalPage.classList.add("hidden");
            contactPage.classList.add("hidden");
            about.classList.add("hidden");
            addNewCV.classList.remove("hidden");
            break;
        default:
            if (hash.includes("id=")) {
                cvList.classList.add("hidden");
                personalPage.classList.remove("hidden");
                contactPage.classList.add("hidden");
                about.classList.add("hidden");
                addNewCV.classList.add("hidden");
                //shows personalData using hash-id
                addUserData(findUserById(hash.split("=")[1]));
            } else {
                window.location.hash = "#home";

            }
            break;
    }
}

document.getElementById("submit-button").addEventListener("click", function(event) {
    console.dir(event);
    event.preventDefault();
    let formElements = document.getElementById("new-members").elements;

    let newUserCV = {
        //imagePath: "./poto/cvImg.jpg",
        id: new Date().valueOf()
    };

    console.log(formElements);
    for (let index = 0; index < formElements.length; index++) {
        newUserCV[formElements[index].name] = formElements[index].value;
    }

    trainees.push(newUserCV);
    saveToStorage(trainees)
    window.location.hash = "#cvPage";
})

function saveToStorage(data) {
    let stringifiedData = JSON.stringify(data);
    window.localStorage.setItem("users", stringifiedData);

    return data;
}

function getFromStorage(key) {
    let dataFromStorage = window.localStorage.getItem(key);
    if (dataFromStorage) {
        return JSON.parse(dataFromStorage);
    }
    return false;
}

function addUserData(programmer) {
    let img = document.querySelector("#personImg");

    img.src = programmer.imagePath || `./poto/${programmer.firstName}${programmer.lastName}.jpg`;
    let imgLoad = false;

    img.onload = function() {
        //alert("image is loaded");
        //console.log("before ", imgLoad);
        imgLoad = true;
    }

    img.onerror = function() {
        //alert("image not found");
        img.src = "./poto/cvImg.jpg";
    }

    //console.log("after ", imgLoad);



    document.querySelector(".secondPageName").innerHTML = programmer.firstName + " " + programmer.lastName;
    document.querySelector(".phone").innerHTML = "phone: " + programmer.phone;
    document.querySelector(".email").innerHTML = "email: " + programmer.email;
    document.querySelector(".infoHeader").innerHTML = "education: " + programmer.education;
    document.querySelector(".infoWork").innerHTML = "workExperience: " + programmer.workExperience;
    document.querySelector(".trainingName").innerHTML = programmer.trainings;
}

function findUserById(userId) {
    return trainees.find(user => user.id == userId);
}