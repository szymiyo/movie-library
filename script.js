const API_KEY = 'e3670a6f';

document.getElementById('searchBtn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;

    if (title) {
        fetchDataFromOMDB(title, type);
    } else {
        alert('Najpierw wpisz tytuł!');
    }
});

function fetchDataFromOMDB(title, type) {
    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${API_KEY}&page=1`;

    if (type !== 'all') {
        url += `&type=${type}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayResults(data.Search);
            } else {
                displayNoResultsMessage("Nie znaleziono wyników dla podanego tytułu.");
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const tableBody = document.getElementById('resultsTable');
    tableBody.innerHTML = '';

    results.forEach(result => {
        tableBody.innerHTML += `
            <tr>
                <td class="border p-2">${result.Title}</td>
                <td class="border p-2">${result.Year}</td>
                <td class="border p-2">${result.Country || 'N/A'}</td>
                <td class="border p-2">${result.Type}</td>
            </tr>
        `;
    });
}

function displayNoResultsMessage(message) {
    const tableBody = document.getElementById('resultsTable');
    tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="border px-4 py-2 text-center">${message}</td>
        </tr>
    `;
}
