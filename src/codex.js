const topicsContent = {
    "QA Fundamentals": [
        { title: "Understanding the Basics of QA: Principles, Processes, and Roles", link: "/articles/qa-fundamentals-1.html" },
        { title: "Testing Approaches Demystified: Manual, Automated, and Beyond", link: "/articles/qa-fundamentals-2.html" },
        { title: "The QA Mindset: Tools, Skills, and Strategies for Success", link: "/articles/qa-fundamentals-3.html" }
    ],
    "Automation Testing": [
        { title: "Top automation frameworks: Selenium, Playwright", link: "/articles/automation-testing-1.html" },
        { title: "Best practices for writing automated tests", link: "/articles/automation-testing-2.html" },
        { title: "Continuous integration with automated tests", link: "/articles/automation-testing-3.html" }
    ],
    "Test Case Management": [
        { title: "How to write effective test cases", link: "/articles/test-case-management-1.html" },
        { title: "Tools for test management: Jira, TestRail", link: "/articles/test-case-management-2.html" },
        { title: "Organizing and prioritizing test cases", link: "/articles/test-case-management-3.html" }
    ],
    "Debugging and Bug Reporting": [
        { title: "Common debugging techniques", link: "/articles/debugging-1.html" },
        { title: "Creating detailed bug reports", link: "/articles/debugging-2.html" },
        { title: "Tools for debugging and reporting", link: "/articles/debugging-3.html" }
    ]
};

function setupCodex() {
    const codex = document.getElementById("codex");
    if (!codex) return;

    // Display the list of topics
    codex.innerHTML = `
        <h1 class="codex__title">Welcome to the Codex</h1>
        <div class="codex__content">
            <p class="codex__description">Choose a topic to explore:</p>
            <div class="codex__list">
                <a href="#" class="codex__topic" data-topic="QA Fundamentals">QA Fundamentals</a>
                <a href="#" class="codex__topic" data-  topic="Automation Testing">Automation Testing</a>
                <a href="#" class="codex__topic" data-topic="Debugging and Bug Reporting">Debugging and Bug Reporting</a>
                <!-- More topics can be added here -->
            </div>
        </div>
    `;

    codex.addEventListener("click", (e) => {
        if (e.target.classList.contains("codex__topic")) {
            e.preventDefault();
            const topic = e.target.dataset.topic;
            const articles = topicsContent[topic]
                .map(article => `<li class="codex__list-item"><a href="${article.link}" class="codex__article">${article.title}</a></li>`)
                .join('');

            codex.innerHTML = `
                <h2 class="codex__title">${topic}</h2>
                <div class="codex__content">
                    <ul class="codex__ul">${articles}</ul>
                    <button id="back" class="codex-btn">Back to Topics</button>
                </div>
            `;

            document.getElementById("back").addEventListener("click", () => location.reload());
        }
    });
}
import './assets/css/components/codex.css'
setupCodex();