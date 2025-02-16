fetch("/scripts/passions.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("passions-container")

        data.buttons.forEach(imgSrc => {
            const passionItem = document.createElement('div');
            const titleDiv = document.createElement('div');
            passionItem.className = "passionItem";
            titleDiv.className = "titleDiv"
            const titleText = imgSrc.match(/([^\/]+)(?=\.[^.]+$)/)[1].toUpperCase();
            titleDiv.innerHTML = titleText;
            titleDiv.innerHTML += `<i class="fa-solid fa-chevron-down"></i>`;
            let img = document.createElement('img');
            img.src = imgSrc;
            img.alt = titleText;
            img.title = titleText
            passionItem.appendChild(img);
            passionItem.appendChild(titleDiv);
            container.appendChild(passionItem);
        })
});

const music = document.getElementById("music");
const hockey = document.getElementById("hockey");
const esports = document.getElementById("esports");
const gaming = document.getElementById("gaming");

document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'scrollToTopBtn') {
        music.innerHTML = "";
        hockey.innerHTML = "";
        esports.innerHTML = "";
        gaming.innerHTML = "";
    }
});

function createScrollToTopButton(container) {
    const btnDiv = document.createElement('div');
    btnDiv.className = "button-container";
    const collapseBtn = document.createElement('button');
    collapseBtn.id = 'scrollToTopBtn';
    collapseBtn.classList.add('scroll-btn');
    collapseBtn.title = "Back to Top"

    const upArrow = document.createElement('span');
    upArrow.classList.add('up-arrow');
    upArrow.innerHTML = '&#8593;'; // Up arrow character

    const line = document.createElement('span');
    line.classList.add('line');
    collapseBtn.appendChild(upArrow);
    collapseBtn.appendChild(line);
    btnDiv.appendChild(collapseBtn);

    container.appendChild(btnDiv);
}

export { createScrollToTopButton };