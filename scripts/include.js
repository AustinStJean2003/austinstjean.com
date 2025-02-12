// Flag to prevent adding the event listener multiple times
let menuListenerAdded = false;

function loadComponent(url, elementId, callback = null) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            const menuToggle = document.querySelector(".menu-toggle");
            const navLinks = document.querySelector(".nav-links");

            if (menuToggle && navLinks) {
                // Remove any existing event listener before adding a new one
                menuToggle.removeEventListener("click", toggleMenu);
                menuToggle.addEventListener("click", toggleMenu);
            }

            if (callback) callback();
        })
        .catch(error => console.error('Error loading component:', error));
}

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// function loadComponent(url, elementId, callback = null) {
//     fetch(url)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById(elementId).innerHTML = data;

//             if (!menuListenerAdded) {
//                 const menuToggle = document.querySelector(".menu-toggle");
//                 const navLinks = document.querySelector(".nav-links");

//                 if (menuToggle && navLinks) {
//                     menuToggle.addEventListener("click", function () {
//                         navLinks.classList.toggle("active");
//                     });
//                 }

//                 menuListenerAdded = true;
//             }

//             if (callback) callback();
//         })
//         .catch(error => console.error('Error loading component:', error));
// }

function highlightActiveTab() {
    const navButtons = document.querySelectorAll(".nav-button");
    const title = document.querySelector("#title");
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name
    navButtons.forEach(button => {
        if (!currentPage) {
            navButtons[0].classList.add("active");
        } else if (button.getAttribute("href").includes(currentPage)) {
            button.classList.add("active");
        }
    });
    if (document.body.offsetWidth <= 1300) {
        const titleText = currentPage.replace(/\..*/, "")
        if (!currentPage || titleText.toLowerCase() == "index") {
            title.textContent = navButtons[0].textContent
        } else {
            title.textContent = titleText.toUpperCase()
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("../components/navbar.html", "navbar", highlightActiveTab);
    loadComponent("../components/footer.html", "footer");
});
