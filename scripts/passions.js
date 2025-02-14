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
            let img = document.createElement('img');
            img.src = imgSrc;
            img.alt = titleText;
            img.title = titleText
            passionItem.appendChild(img);
            passionItem.appendChild(titleDiv);
            container.appendChild(passionItem);
        })
    });
