//News
const apiKey = '3d84d26000353bfc4a0e46fd5d6bd5e3';

async function fetchBreakingNews() {
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&token=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
}

async function fetchNews(query) {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&token=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
}


function createArticleElement(article) {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const imageElement = document.createElement('img');
    imageElement.src = article.image || 'Media/placeholder.png';
    imageElement.alt = article.title;

    const titleElement = document.createElement('h3');
    titleElement.textContent = article.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description;

    const linkElement = document.createElement('a');
    linkElement.href = article.url;
    linkElement.textContent = 'Read More';

    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(linkElement);

    return articleElement;
}

async function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-text');
    const query = searchInput.value.trim();

    if (query) {
        try {
            const articles = await fetchNews(query);
            renderNews(articles, 'searchResultsContainer');
            document.getElementById('breakingNews').style.display = 'none';
            document.getElementById('searchResults').style.display = 'block';
        } catch (error) {
            console.log('Error fetching news:', error);
        }
    }
}

function renderNews(articles, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    articles.forEach(article => {
        const articleElement = createArticleElement(article);
        container.appendChild(articleElement);
    });
}

async function initialize() {
    try {
        const breakingNews = await fetchBreakingNews();
        renderNews(breakingNews, 'breakingNewsContainer');
    } catch (error) {
        console.log('Error fetching breaking news:', error);
    }
}

const searchForm = document.getElementById('search-button');
searchForm.addEventListener('click', handleSearch);

initialize();