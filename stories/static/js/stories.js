let stories = [];
let currentStoryPage = 1;
const storyPageSize = 6;
let isStoryLoading = false;
let hasMoreStories = true;

function fetchStories(page = 1) {
    if (isStoryLoading || !hasMoreStories) return;

    isStoryLoading = true;

    fetch(`http://127.0.0.1:8000/api/filtered-stories/?page_size=${storyPageSize}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                hasMoreStories = false;
                return;
            }

            stories = [...stories, ...data.results]; // Save all loaded stories
            displayStories(data.results);
            currentStoryPage++;
        })
        .catch(error => {
            console.error('Error fetching stories:', error);
        })
        .finally(() => {
            isStoryLoading = false;
        });
}

function displayStories(newStories) {
    const container = document.getElementById("stories-container");

    newStories.forEach(story => {
        const card = document.createElement("div");
        card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4", "story-card", "d-flex");
        card.setAttribute("data-course", story.course);
        card.setAttribute("data-month", story.month);
        card.setAttribute("data-year", story.year);

        card.innerHTML = `
            <div class="card card-custom h-100 w-100">
                <div class="position-relative card-img-container">
                    <div class="custom-indicator"></div>
                    <img src="${story.image_url || '/static/images/person.png'}" class="card-img-top" alt="Alumni Image">
                </div>
                <div class="card-body text-center">
                    <div class="card-body text-start">
                        <h5 class="card-title font-weight-bold">${story.title}</h5>
                        <p class="card-text text-muted">${story.summary || 'A success story from our alumni.'}</p>
                    </div>
                    <a href="#" class="btn btn-custom">Read More</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterStories() {
    const selectedCourse = document.getElementById("courseFilter").value;
    const selectedMonth = document.getElementById("monthFilter").value;
    const selectedYear = document.getElementById("yearFilter").value.trim();
    const storyCards = document.querySelectorAll(".story-card");

    storyCards.forEach(card => {
        const course = card.getAttribute("data-course");
        const month = card.getAttribute("data-month");
        const year = card.getAttribute("data-year");

        const matchesCourse = selectedCourse === "all" || course === selectedCourse;
        const matchesMonth = selectedMonth === "all" || month === selectedMonth;
        const matchesYear = selectedYear === "all" || year === selectedYear;

        card.style.display = (matchesCourse && matchesMonth && matchesYear) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchStories(currentStoryPage); // Load initial stories

    document.getElementById("courseFilter").addEventListener("change", filterStories);
    document.getElementById("monthFilter").addEventListener("change", filterStories);
    document.getElementById("yearFilter").addEventListener("input", filterStories);

    // Optional: infinite scroll for stories
    const storyContainer = document.getElementById("stories-container");
    storyContainer.addEventListener("scroll", () => {
        const scrollTop = storyContainer.scrollTop;
        const scrollHeight = storyContainer.scrollHeight;
        const clientHeight = storyContainer.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            fetchStories(currentStoryPage);
        }
    });
});
