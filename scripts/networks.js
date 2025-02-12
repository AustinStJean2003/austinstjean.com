fetch('/scripts/networks.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('networks-container');

        // Loop through each object in the JSON array
        data.forEach(item => {

            const linkItem = document.createElement('a')
            linkItem.classList.add("linkItem")
            linkItem.target = "_blank"
            linkItem.href = item.link;

            const networkItem = document.createElement('div');
            networkItem.classList.add('network-item');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.title = item.name;

            const username = document.createElement('div');
            username.classList.add('username');
            username.innerText = item.username;

            linkItem.appendChild(networkItem);
            networkItem.appendChild(img);
            networkItem.appendChild(username);

            container.appendChild(linkItem);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));