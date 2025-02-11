// Flag to prevent adding the event listener multiple times
let menuListenerAdded = false;

function loadComponent(url, elementId, callback = null) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            if (!menuListenerAdded) {
                const menuToggle = document.querySelector(".menu-toggle");
                const navLinks = document.querySelector(".nav-links");

                if (menuToggle && navLinks) {
                    menuToggle.addEventListener("click", function () {
                        console.log('Hamburger clicked!');
                        navLinks.classList.toggle("active");
                    });
                }

                menuListenerAdded = true;
            }

            if (callback) callback();
        })
        .catch(error => console.error('Error loading component:', error));
}

function highlightActiveTab() {
    const navButtons = document.querySelectorAll(".nav-button");
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name

    navButtons.forEach(button => {
        if (button.getAttribute("href").includes(currentPage)) {
            button.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("../components/navbar.html", "navbar", highlightActiveTab);
    loadComponent("../components/footer.html", "footer");
});
