document.getElementById("passions-container").addEventListener("click", function (event) {
    const clickedItem = event.target.closest(".passionItem");
    if (clickedItem.textContent == "GAMING") {
        const titleText = clickedItem.querySelector(".titleDiv").innerText.toLowerCase();

        document.querySelectorAll("main > div:not(#passions-container)").forEach(div => {
            div.style.display = "none";
            div.innerHTML = ""
        });

        const container = document.getElementById(titleText);
        if (container) {
            container.style.display = "block";
            fetch("/scripts/passions.json")
                .then(response => response.json())
                .then(data => {
                    console.log("GAMING")
                });
        }
    }
})