// Function to load an external file into an element
function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load navbar and footer
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("../components/navbar.html", "navbar");
    loadComponent("../components/footer.html", "footer");
});
