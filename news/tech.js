const apiKey = "5f9ab8244ce14a40934cb7c5dabc8d3f";
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
const techNews = document.querySelector('#techNews .newsBox');

// Fetch data function
const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
};

// Add technology news function
const add_techNews = (data) => {
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
    techNews.innerHTML = html;
};

// Fetch technology news
async function fetchTechNews() {
    try {
        document.getElementById('loader').style.display = 'block';
        const techData = await fetchData('technology', 50);
        add_techNews(techData);
    } catch (error) {
        console.error('Error fetching technology news data:', error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// Perform technology search
async function performTechSearch() {
    const query = searchText.value.trim();

    if (query === "") {
        alert("Please enter a search query.");
        return;
    }
    
    try {
        document.getElementById('loader').style.display = 'block';
        const techData = await fetchData('technology', 100);

        const searchResults = techData.filter(article => {
            return article.title.toLowerCase().includes(query.toLowerCase()) ||
                   (article.description && article.description.toLowerCase().includes(query.toLowerCase()));
        });
        
        add_techNews(searchResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// Event listeners
searchButton.addEventListener("click", performTechSearch);
searchText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        performTechSearch();
    }
});

searchText.addEventListener("input", function() {
    const query = searchText.value.trim();
    if (query === "") {
        fetchTechNews();
    }
});

// Load initial technology news
document.addEventListener('DOMContentLoaded', fetchTechNews);