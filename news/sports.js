const apiKey = "5f9ab8244ce14a40934cb7c5dabc8d3f";
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
const sportsNews = document.querySelector('#sportsNews .newsBox');

// Fetch data function
const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
};

// Add sports news function
const add_sportsNews = (data) => {
    let html = '';
    data.forEach((article) => {
        if (article.urlToImage) {
            let title = article.title.length < 100 ? article.title : article.title.slice(0, 100) + "...";
            html += `
                <div class="newsCard">
                    <div class="img">
                        <img src="${article.urlToImage}" alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href="${article.url}" target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`;
        }
    });
    sportsNews.innerHTML = html;
};

// Fetch sports news
async function fetchSportsNews() {
    try {
        document.getElementById('loader').style.display = 'block';
        const sportsData = await fetchData('sports', 50);
        add_sportsNews(sportsData);
    } catch (error) {
        console.error('Error fetching sports news data:', error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// Perform sports search
async function performSportsSearch() {
    const query = searchText.value.trim();

    if (query === "") {
        alert("Please enter a search query.");
        return;
    }
    
    try {
        document.getElementById('loader').style.display = 'block';
        const sportsData = await fetchData('sports', 100);

        const searchResults = sportsData.filter(article => {
            return article.title.toLowerCase().includes(query.toLowerCase()) ||
                   (article.description && article.description.toLowerCase().includes(query.toLowerCase()));
        });
        
        add_sportsNews(searchResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// Event listeners
searchButton.addEventListener("click", performSportsSearch);
searchText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        performSportsSearch();
    }
});

searchText.addEventListener("input", function() {
    const query = searchText.value.trim();
    if (query === "") {
        fetchSportsNews();
    }
});

// Load initial sports news
document.addEventListener('DOMContentLoaded', fetchSportsNews);