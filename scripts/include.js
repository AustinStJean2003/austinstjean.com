// Flag to prevent adding the event listener multiple times
let menuListenerAdded = false;

// Function to load an external file into an element
function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // Ensure the menu listener is only added once
            if (!menuListenerAdded) {
                const menuToggle = document.querySelector(".menu-toggle");
                const navLinks = document.querySelector(".nav-links");

                if (menuToggle && navLinks) {
                    menuToggle.addEventListener("click", function () {
                        console.log('Hamburger clicked!');
                        navLinks.classList.toggle("active");
                    });
                }

                // Mark the listener as added
                menuListenerAdded = true;
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    // Load navbar and footer
    loadComponent("../components/navbar.html", "navbar");
    loadComponent("../components/footer.html", "footer");
});
