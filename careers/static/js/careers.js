let jobs = [];
let currentPage = 1;
const pageSize = 5;
let isLoading = false;
let hasNextPage = true;

function fetchJobs(page = 1) {
    if (isLoading || !hasNextPage) return;

    isLoading = true;
    fetch(`http://127.0.0.1:8000/api/filtered-jobposts/?page_size=${pageSize}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                hasNextPage = false;
                return;
            }

            jobs = [...jobs, ...data.results]; // Append new jobs
            displayJobs(data.results);         // Only display newly fetched jobs
            currentPage++;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            isLoading = false;
        });
}

function displayJobs(newJobs) {
    const jobListings = document.getElementById("jobListings");

    newJobs.forEach((job, index) => {
        const jobItem = document.createElement("div");
        jobItem.classList.add("job-listing");

        jobItem.innerHTML = `
            <h6 class="fw-bold text-danger">${job.title}</h6>
            <p class="mb-1">${job.company}</p>
            <p class="text-muted small job-desc">${job.description}</p>
            <p class="text-muted small">${job.location}</p>
        `;

        jobItem.addEventListener("click", () => loadJobDetails(jobs.indexOf(job)));
        jobListings.appendChild(jobItem);
    });
}

function loadJobDetails(index) {
    const job = jobs[index];

    const responsibilities = Array.isArray(job.responsibilities)
        ? job.responsibilities
        : tryParseArray(job.responsibilities);

    const qualifications = Array.isArray(job.qualifications)
        ? job.qualifications
        : tryParseArray(job.qualifications);

    const benefits = Array.isArray(job.benefits)
        ? job.benefits
        : tryParseArray(job.benefits);

    document.getElementById("jobDetails").innerHTML = `
        <h4 class="text-danger fw-bold">${job.title}</h4>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location} <strong>Salary:</strong> ${job.salary} <strong>Job Type:</strong> ${job.type}</p>
        <hr>
        <h5 class="fw-bold">Job Description</h5>
        <p>${job.description}</p>
        <h5 class="fw-bold">Job Responsibilities</h5>
        <ul>${responsibilities.map(res => `<li>${res}</li>`).join('')}</ul>
        <h5 class="fw-bold">Job Qualifications</h5>
        <ul>${qualifications.map(qual => `<li>${qual}</li>`).join('')}</ul>
        <h5 class="fw-bold">Job Benefits</h5>
        <ul>${benefits.map(ben => `<li>${ben}</li>`).join('')}</ul>
    `;
}

function tryParseArray(value) {
    if (Array.isArray(value)) return value;
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// 👇 Detect when scrolled near the bottom
document.addEventListener("DOMContentLoaded", () => {
    fetchJobs(currentPage);

    const jobListings = document.getElementById("jobListings");

    jobListings.addEventListener("scroll", () => {
        const scrollTop = jobListings.scrollTop;
        const scrollHeight = jobListings.scrollHeight;
        const clientHeight = jobListings.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            fetchJobs(currentPage);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => fetchJobs(currentPage));


