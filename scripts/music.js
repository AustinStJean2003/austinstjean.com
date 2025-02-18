import { createScrollToTopButton } from './passions.js';
document.getElementById("passions-container").addEventListener("click", function (event) {
    const clickedItem = event.target.closest(".passionItem");

    if (clickedItem.textContent == "MUSIC") {
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
                    const musicDiv = document.getElementById("music");
                    const artistDiv = document.createElement('div');
                    artistDiv.className = "artists-container";
                    const h3artists = document.createElement('h3');
                    h3artists.innerHTML = "Favoutire Artists"
                    musicDiv.appendChild(h3artists)
                    data.artists.forEach(artist => {
                        const artistItem = document.createElement('div');
                        const artistTitle = document.createElement('div');
                        const artistLink = document.createElement('a');
                        artistItem.className = "artistsItem";
                        artistTitle.className = "artist";
                        artistLink.classList = "artistLink";
                        artistLink.href = artist.link;
                        artistLink.target = "_blank";
                        const artistText = artist.name;
                        let img = document.createElement('img');
                        img.src = artist.image;
                        img.alt = artistText;
                        img.title = artistText;
                        artistItem.appendChild(img)
                        artistTitle.innerHTML = artistText;
                        artistItem.appendChild(artistTitle);
                        artistLink.appendChild(artistItem);
                        artistDiv.appendChild(artistLink);
                        musicDiv.appendChild(artistDiv);
                    })

                    const songsContainer = document.createElement('div');
                    songsContainer.className = "songs-container";

                    const h3songs = document.createElement('h3');
                    h3songs.innerHTML = "Favourite Songs";
                    musicDiv.appendChild(h3songs);

                    const table = document.createElement("table");
                    table.className = "songs-table";

                    const thead = document.createElement("thead");
                    thead.innerHTML = `
            <tr>
                <th>Rank</th>
                <th>Song Title</th>
                <th>Artist</th>
                <th>Link</th>
            </tr>
        `;
                    table.appendChild(thead);

                    // Create table body
                    const tbody = document.createElement("tbody");

                    data.songs.forEach((song, index) => {
                        const row = document.createElement("tr");

                        // Number column
                        const numCell = document.createElement("td");
                        numCell.textContent = index + 1;
                        row.appendChild(numCell);

                        // Title column
                        const titleCell = document.createElement("td");
                        titleCell.textContent = song.name;
                        row.appendChild(titleCell);

                        // Artist column
                        const artistCell = document.createElement("td");
                        artistCell.textContent = song.artist;
                        row.appendChild(artistCell);

                        // Link column (Image Link)
                        const linkCell = document.createElement("td");
                        const link = document.createElement("a");
                        link.href = song.link ? song.link : "#";
                        link.target = "_blank";

                        const linkImg = document.createElement("img");
                        linkImg.className = "linkImg";
                        linkImg.src = "/images/passions/spotify.png";
                        linkImg.alt = "Play Song";

                        link.appendChild(linkImg);
                        linkCell.appendChild(link);
                        row.appendChild(linkCell);

                        tbody.appendChild(row);
                    });

                    table.appendChild(tbody);
                    songsContainer.appendChild(table);
                    musicDiv.appendChild(songsContainer);
                    const videoContainer = document.createElement('div');
                    videoContainer.className = "video-container"
                    const videoDiv = document.createElement('div');
                    videoDiv.className = "video-div"
                    const videoText = document.createElement('div');
                    videoText.className = "video-text"
                    videoText.innerHTML = "NF Concert at the Canadian Tire Center, September 2nd 2023"
                    const video = document.createElement('video');
                    video.src = '/videos/nf_concert.mov';
                    video.controls = true; 
                    video.autoplay = false;
                    videoDiv.appendChild(video);
                    videoDiv.appendChild(videoText);
                    videoContainer.appendChild(videoDiv)
                    musicDiv.appendChild(videoContainer);
                    createScrollToTopButton(container);
                    setTimeout(() => {
                        container.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                })
        }
    }
});

