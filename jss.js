
const articles = [
    {
        id: 1,
        category: "World",
        title: "Global Leaders Meet to Discuss Important Issues",
        description: "Leaders from around the world gather to discuss cooperation, development, and global challenges.",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
        date: "Oct 12, 2026",
        trending: true
    },
    {
        id: 2,
        category: "Technology",
        title: "Artificial Intelligence Continues to Transform Daily Life",
        description: "New digital tools are changing how people learn, work, communicate, and solve problems.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        date: "Oct 11, 2026",
        trending: true
    },
    {
        id: 3,
        category: "Sports",
        title: "Young Athletes Prepare for Upcoming Competitions",
        description: "Athletes are stepping up their training as sports fans look forward to exciting contests.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        date: "Oct 10, 2026",
        trending: true
    },
    {
        id: 4,
        category: "Business",
        title: "Digital Payments Continue to Change Shopping Habits",
        description: "Businesses are adopting convenient payment methods to improve the customer experience.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        date: "Oct 9, 2026",
        trending: false
    },
    {
        id: 5,
        category: "Entertainment",
        title: "Cinema Fans Look Forward to New Movie Releases",
        description: "Filmmakers and actors are preparing fresh stories for audiences across different genres.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        date: "Oct 8, 2026",
        trending: true
    },
    {
        id: 6,
        category: "Technology",
        title: "Students Explore New Ways to Learn Online",
        description: "Online learning platforms are providing students with additional educational resources.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        date: "Oct 7, 2026",
        trending: false
    },
    {
        id: 7,
        category: "World",
        title: "Environmental Awareness Gains More Attention",
        description: "Communities are exploring practical ways to reduce waste and protect natural resources.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
        date: "Oct 6, 2026",
        trending: false
    },
    {
        id: 8,
        category: "Business",
        title: "Small Businesses Explore Online Growth Opportunities",
        description: "Digital marketplaces help entrepreneurs reach customers beyond their local communities.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
        date: "Oct 5, 2026",
        trending: false
    }
];

// HTML elements
const newsGrid = document.getElementById("newsGrid");
const trendingList = document.getElementById("trendingList");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultMessage = document.getElementById("resultMessage");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

// Current filter and search
let currentCategory = "All";
let currentSearch = "";

// Display news articles
function displayNews(newsArray) {
    newsGrid.innerHTML = "";

    if (newsArray.length === 0) {
        newsGrid.innerHTML = `
            <p class="empty-message">
                No news articles found. Try another search.
            </p>
        `;
        resultMessage.textContent = "No matching stories found.";
        return;
    }

    resultMessage.textContent =
        `Showing ${newsArray.length} news article(s)`;

    newsArray.forEach(article => {
        const card = document.createElement("article");
        card.className = "news-card";

        const image = document.createElement("img");
        image.src = article.image;
        image.alt = article.category + " news";
        image.loading = "lazy";

        image.onerror = function () {
            this.style.display = "none";
        };

        const content = document.createElement("div");
        content.className = "news-content";

        const category = document.createElement("span");
        category.className = "news-category";
        category.textContent = article.category;

        const title = document.createElement("h3");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        const meta = document.createElement("div");
        meta.className = "news-meta";

        const date = document.createElement("span");
        date.textContent = article.date;

        const label = document.createElement("span");
        label.textContent = "Daily News";

        meta.append(date, label);

        const readMore = document.createElement("a");
        readMore.href = "#";
        readMore.className = "read-story";
        readMore.textContent = "Read More →";

        // Demo action because articles are sample content
        readMore.addEventListener("click", function (event) {
            event.preventDefault();
            alert(
                "Sample article:\n\n" +
                article.title +
                "\n\n" +
                article.description +
                "\n\nConnect a news article page to read the full story."
            );
        });

        content.append(
            category,
            title,
            description,
            meta,
            readMore
        );

        card.append(image, content);
        newsGrid.appendChild(card);
    });
}

// Filter by category and search keyword
function filterNews() {
    const filteredNews = articles.filter(article => {
        const matchesCategory =
            currentCategory === "All" ||
            article.category === currentCategory;

        const searchText = (
            article.title + " " +
            article.description + " " +
            article.category
        ).toLowerCase();

        const matchesSearch =
            searchText.includes(currentSearch.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    displayNews(filteredNews);
}

// Show trending stories
function displayTrending() {
    trendingList.innerHTML = "";

    const trendingArticles = articles.filter(
        article => article.trending
    );

    trendingArticles.forEach(article => {
        const item = document.createElement("li");
        const link = document.createElement("a");

        link.href = "#latest";
        link.textContent = article.title;

        link.addEventListener("click", function () {
            currentCategory = "All";
            currentSearch = "";
            searchInput.value = "";
            filterNews();
        });

        item.appendChild(link);
        trendingList.appendChild(item);
    });
}

// Category navigation
document.querySelectorAll("[data-category]").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        currentCategory = this.dataset.category;
        currentSearch = "";
        searchInput.value = "";

        filterNews();

        navLinks.classList.remove("active");
        document.getElementById("latest").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Search articles
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    currentSearch = searchInput.value.trim();
    filterNews();

    document.getElementById("latest").scrollIntoView({
        behavior: "smooth"
    });
});

// Reset filters
document.getElementById("showAll").addEventListener("click", function () {
    currentCategory = "All";
    currentSearch = "";
    searchInput.value = "";
    filterNews();
});

// Mobile navigation
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Newsletter demo
document.getElementById("newsletterForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const email = document.getElementById("emailInput").value.trim();
        const message = document.getElementById("newsletterMessage");

        if (email) {
            message.textContent =
                "Thank you for your interest! Newsletter signup is a demo.";
            this.reset();
        }
    }
);

// Breaking news ticker
const tickerText = document.getElementById("tickerText");

tickerText.textContent =
    "Top Stories: World News | Technology | Sports | Business | Entertainment";

// Footer year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Initial page setup
displayNews(articles);
displayTrending();
