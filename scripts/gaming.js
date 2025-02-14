import { createScrollToTopButton } from './passions.js';
document.getElementById("passions-container").addEventListener("click", function (event) {
    const clickedItem = event.target.closest(".passionItem");
    if (clickedItem.textContent == "GAMING") {
        const titleText = clickedItem.querySelector(".titleDiv").innerText.toLowerCase();

        document.querySelectorAll("main > div:not(#passions-container)").forEach(div => {
            div.style.display = "none";
            div.innerHTML = "";
        });

        const container = document.getElementById(titleText);
        if (container) {
            container.style.display = "block";
            fetch("/scripts/passions.json")
                .then(response => response.json())
                .then(data => {
                    const h3 = document.createElement('h3');
                    h3.innerHTML = "Favourite Games";
                    container.appendChild(h3);
                    const gamesDiv = document.createElement('div');
                    gamesDiv.className = "game-container";
                    data.games.forEach((game, index) => {
                        // GameItem
                        const gameItem = document.createElement('div');
                        gameItem.className = "gameItem";
                        // GameTitle
                        const gameTitle = document.createElement('div');
                        gameTitle.className = "game";
                        gameTitle.innerHTML = game.name;
                        // Image
                        const img = document.createElement("img");
                        img.src = game.image;
                        img.alt = game.name;
                        img.title = game.name;
                        img.className = "game-image";
                        // Number in top left of div
                        const rankText = index + 1;
                        const rank = document.createElement('span');
                        rank.className = 'result-rank';
                        let suffix = "th";
                        const lastDigit = rankText % 10;
                        if (lastDigit === 1) suffix = "st";
                        else if (lastDigit === 2) suffix = "nd";
                        else if (lastDigit === 3) suffix = "rd";
                        rank.innerHTML = `${rankText}${suffix}`;
                        // Add to container
                        gameItem.appendChild(img);
                        gameItem.appendChild(gameTitle);
                        gameItem.appendChild(rank);
                        gamesDiv.appendChild(gameItem);
                        container.appendChild(gamesDiv);
                    })

                    const h3Games = document.createElement('h3');
                    h3Games.innerHTML = "Reviews";

                    const reviewsDiv = document.createElement('div');
                    container.appendChild(h3Games);
                    reviewsDiv.className = "review-container"
                    data.reviews.forEach(reviewData => {
                        const review = document.createElement('div');
                        review.classList.add('steam-review');

                        // Game title
                        const gameTitle = document.createElement('h4');
                        gameTitle.innerHTML = `${reviewData.title}`;

                        // Recommendation
                        const recommendation = document.createElement('p');
                        recommendation.innerHTML = `<strong>Recommendation:</strong> ${reviewData.recommendation}`;

                        // Review text
                        const reviewText = document.createElement('blockquote');
                        reviewText.innerHTML = reviewData.text;

                        // Steam review link
                        const reviewLink = document.createElement('p');
                        const link = document.createElement('a');
                        link.href = reviewData.link ? reviewData.link : "#";
                        link.target = "_blank";
                        const linkImg = document.createElement("img");
                        linkImg.className = "steamLink";
                        linkImg.src = "/images/passions/steam.png";
                        linkImg.alt = "View Review";
                        linkImg.title = "View Review"
                        link.appendChild(linkImg);
                        reviewLink.appendChild(link);

                        // Append elements to review container
                        review.appendChild(gameTitle);
                        review.appendChild(recommendation);
                        review.appendChild(reviewText);
                        review.appendChild(reviewLink);

                        // Append review container to reviewsDiv
                        reviewsDiv.appendChild(review);
                    });

                    // Append everything to the main container
                    container.appendChild(reviewsDiv);
                    createScrollToTopButton(container)

                });
        }
    }
})