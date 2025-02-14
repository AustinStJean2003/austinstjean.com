document.getElementById("passions-container").addEventListener("click", function (event) {
    const clickedItem = event.target.closest(".passionItem");
    if (clickedItem.textContent == "HOCKEY") {
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
                    const h3 = document.createElement('h3')
                    h3.innerHTML = "Favourite Players";
                    container.appendChild(h3)
                    const playersDiv = document.createElement('div')
                    playersDiv.className = "player-container"
                    data.players.forEach(player => {
                        const playerItem = document.createElement('div')
                        const playerTitle = document.createElement('div')
                        const playerDescription = document.createElement('div')
                        const img = document.createElement("img");
                        playerItem.className = "playerItem";
                        playerTitle.className = "player";
                        playerDescription.className = "description";
                        img.src = player.image;
                        img.alt = player.name;
                        img.title = player.name;
                        img.className = "player-image";
                        playerDescription.innerHTML = player.description;
                        playerTitle.innerHTML = player.name;
                        playerItem.appendChild(img)
                        playerItem.appendChild(playerTitle)
                        playerItem.appendChild(playerDescription)
                        playersDiv.appendChild(playerItem)
                        container.appendChild(playersDiv)
                    })
                    const h3Teams = document.createElement('h3');
                    h3Teams.innerHTML = "Favourite Teams";
                    container.appendChild(h3Teams);
                    const teamsDiv = document.createElement('div');
                    teamsDiv.className = "teams-container";
                    data.teams.forEach(team => {
                        const teamDiv = document.createElement('div');
                        teamDiv.className = "teamItem";
                        const h1 = document.createElement('h1');
                        h1.className = team.shortname;
                        h1.innerHTML = team.name;
                        const img = document.createElement('img')
                        img.src = team.image;
                        img.alt = team.name;
                        img.title = team.name;
                        img.className = "team-image";
                        const description = document.createElement('div');
                        description.innerHTML = team.description;
                        description.className = "description"
                        teamDiv.appendChild(img)
                        teamDiv.appendChild(h1)
                        teamDiv.appendChild(description)
                        teamsDiv.appendChild(teamDiv)
                        
                    })
                    container.appendChild(teamsDiv)
                });
        }
    }
})