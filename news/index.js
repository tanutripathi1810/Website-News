let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)

window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})

const apiKey = "5f9ab8244ce14a40934cb7c5dabc8d3f"

const fetchData = async (category,pageSize)=>{
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles
    
}

const add_breakingNews = (data) => {
    // Filter out articles without an image
    const articlesWithImages = data.filter(article => article.urlToImage);

    if (articlesWithImages.length > 0) {
        // Use the first article that has an image
        const article = articlesWithImages[0];
        breakingImg.innerHTML = `<img src=${article.urlToImage} alt="image">`
        breakingNews_title.innerHTML = `<a href=${article.url} target="_blank"><h2>${article.title}</h2></a>`
        breakingNews_desc.innerHTML = `${article.description}`
    } else {
        // Optionally handle the case where no articles have images
        console.log('No breaking news with images available');
        // You can also set a placeholder here or hide the breaking news section
    }
}

fetchData('general',5).then(add_breakingNews)


const add_topNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="news">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    topNews.innerHTML = html;
};
fetchData('general',20).then(add_topNews)

const add_sportsNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    sportsNews.innerHTML = html;
    document.getElementById('loader').style.display = 'none'; // Hide loader
};

// Show loader before fetching data
document.getElementById('loader').style.display = 'block';
fetchData('sports', 20).then(add_sportsNews);




const add_businessNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    businessNews.innerHTML = html;
    document.getElementById('loader').style.display = 'none'; // Hide loader
};

document.getElementById('loader').style.display = 'block';
fetchData('business',20).then(add_businessNews)
const add_techNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    techNews.innerHTML = html;
    document.getElementById('loader').style.display = 'none'; // Hide loader
};
document.getElementById('loader').style.display = 'block';
fetchData('technology',20).then(add_techNews)

function openSurvey() {
    window.open("news.html", "_blank");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", async function() {
    const query = searchText.value.trim();

    if (query === "") {
        alert("Please enter a search query.");
        return;
    }
    
    try {
        // Fetch data for all categories
        const generalData = await fetchData('general', 20);
        const sportsData = await fetchData('sports', 20);
        const businessData = await fetchData('business', 20);
        const techData = await fetchData('technology', 20);

        // Combine data from all categories into one array
        const allData = [...generalData, ...sportsData, ...businessData, ...techData];

        // Filter the search results based on the query.
        const searchResults = allData.filter(article => {
            return article.title.toLowerCase().includes(query.toLowerCase());
        });
        
        // Display the search results.
        displaySearchResults(searchResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
});

function displaySearchResults(results) {
    let html = '';
    results.forEach(article => {
        html += `<div class="news">
                    <div class="img">
                        <img src="${article.urlToImage}" alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href="${article.url}" target="_blank"><p>${article.title}</p></a>
                        </div>
                    </div>
                </div>`;
    });
    
    // Append the search results to the 'topNews' container
    topNews.innerHTML = html;
    const searchText = document.getElementById("search-text");

    searchText.addEventListener("input", async function() {
        const query = searchText.value.trim();
        
        if (query === "") {
            // If the search input is empty, reload or fetch the news data again
            await fetchNewsData();
        }
    });
    
    async function fetchNewsData() {
        try {
            // Fetch news data and display it
            const newsData = await fetchData('general', 20);
            add_topNews(newsData);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    }
    
}

