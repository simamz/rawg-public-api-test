const API_KEY = "b29efa2f0367444681de8ea5d0b55498";
const BASE_URL = "https://api.rawg.io/api/games";

// Function to get and display popular games
async function getPopularGames() {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=5`);
    const data = await response.json();

    const popularGamesContainer = document.getElementById("popular-games");
    popularGamesContainer.innerHTML = ""; // Clear previous content

    data.results.forEach(game => {
        const gameCard = `
            <div class="game-card">
                <img src="${game.background_image}" alt="${game.name}">
                <h4>${game.name}</h4>
                <p>Rating: ${game.rating}</p>
            </div>
        `;
        popularGamesContainer.innerHTML += gameCard;
    });
}

// Function to search game by name
async function searchGame() {
    const searchInput = document.getElementById("search-input").value;
    if (!searchInput) return;

    const response = await fetch(`${BASE_URL}?key=${API_KEY}&search=${encodeURIComponent(searchInput)}`);
    const data = await response.json();

    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = ""; // Clear previous results

    data.results.forEach(game => {
        const gameCard = `
            <div class="game-card">
                <img src="${game.background_image}" alt="${game.name}">
                <h4>${game.name}</h4>
                <p>Released: ${game.released}</p>
            </div>
        `;
        searchResultsContainer.innerHTML += gameCard;
    });
}

// Function to get game details by ID
async function getGameDetails() {
    const gameIdInput = document.getElementById("game-id-input").value;
    if (!gameIdInput) return;

    const response = await fetch(`${BASE_URL}/${gameIdInput}?key=${API_KEY}`);
    const data = await response.json();

    const gameDetailsContainer = document.getElementById("game-details");
    gameDetailsContainer.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.background_image}" alt="${data.name}" style="width:100%">
        <p><strong>Released:</strong> ${data.released}</p>
        <p><strong>Rating:</strong> ${data.rating}</p>
        <p>${data.description_raw ? data.description_raw.slice(0, 200) + "..." : "No description available."}</p>
    `;
}

// Fetch popular games on page load
window.onload = getPopularGames;
