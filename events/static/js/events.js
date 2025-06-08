document.addEventListener("DOMContentLoaded", function () {
    const filterDropdown = document.getElementById("filter");
    const monthDropdown = document.getElementById("month");
    const yearDropdown = document.getElementById("year");
    const articles = document.querySelectorAll(".article-card");

    function filterArticles() {
        const selectedCategory = filterDropdown.value.toLowerCase();
        const selectedMonth = monthDropdown.value.toLowerCase();
        const selectedYear = yearDropdown.value.toLowerCase();

        articles.forEach(article => {
            const articleCategory = article.dataset.category ? article.dataset.category.toLowerCase() : "";
            const articleMonth = article.dataset.month ? article.dataset.month.toLowerCase() : "";
            const articleYear = article.dataset.year ? article.dataset.year.toLowerCase() : "";

            // Check if article matches selected filters
            const categoryMatch = selectedCategory === "all articles" || articleCategory === selectedCategory;
            const monthMatch = selectedMonth === "all" || articleMonth === selectedMonth;
            const yearMatch = selectedYear === "all" || articleYear === selectedYear;

            // Show or hide article based on matches
            article.style.display = categoryMatch && monthMatch && yearMatch ? "block" : "none";
        });
    }

    // Add event listeners to dropdowns
    filterDropdown.addEventListener("change", filterArticles);
    monthDropdown.addEventListener("change", filterArticles);
    yearDropdown.addEventListener("change", filterArticles);
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const monthDropdown = document.getElementById("month");
    const yearDropdown = document.getElementById("year");

    // Populate months dynamically
    const months = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach(month => {
        let option = document.createElement("option");
        option.textContent = month;
        option.value = month.toLowerCase();
        monthDropdown.appendChild(option);
    });

    // Populate years dynamically (e.g., from 2020 to the current year)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2020; year--) {
        let option = document.createElement("option");
        option.textContent = year;
        option.value = year;
        yearDropdown.appendChild(option);
    }
});