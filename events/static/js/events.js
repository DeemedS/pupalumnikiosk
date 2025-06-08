document.addEventListener("DOMContentLoaded", function () {
    const monthDropdown = document.getElementById("month-filter");
    const yearDropdown = document.getElementById("year-filter");

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