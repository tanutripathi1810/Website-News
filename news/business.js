const apiKey = "5f9ab8244ce14a40934cb7c5dabc8d3f";
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
const businessNews = document.querySelector('#businessNews .newsBox');

// Fetch data function
const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
};

// Add business news function
const add_businessNews = (data) => {
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
    businessNews.innerHTML = html;
};

// Fetch business news
async function fetchBusinessNews() {
    try {
        document.getElementById('loader').style.display = 'block';
        const businessData = await fetchData('business', 50);
        add_businessNews(businessData);
    } catch (error) {
        console.error('Error fetching business news data:', error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// Perform business search
async function performBusinessSearch() {
    const query = searchText.value.trim();

    if (query === "") {
        alert("Please enter a search query.");
        return;
    }
    
    try {
        document.getElementById('loader').style.display = 'block';
        const businessData = await fetchData('business', 100);

        const searchResults = businessData.filter(article => {
            return article.title.toLowerCase().includes(query.toLowerCase()) ||
                   (article.description && article.description.toLowerCase().includes(query.toLowerCase()));
        });
        
        add_businessNews(searchResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// Event listeners
searchButton.addEventListener("click", performBusinessSearch);
searchText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        performBusinessSearch();
    }
});

searchText.addEventListener("input", function() {
    const query = searchText.value.trim();
    if (query === "") {
        fetchBusinessNews();
    }
});

// Load initial business news
document.addEventListener('DOMContentLoaded', fetchBusinessNews);