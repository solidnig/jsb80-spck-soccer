// Toast functionality
const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
    });
}

// Tooltip functionality
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.darkModeToggle = document.getElementById("darkModeToggle");
        this.body = document.body;
        this.isDarkMode = this.getSavedTheme();

        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.isDarkMode);

        // Add event listener
        if (this.darkModeToggle) {
            this.darkModeToggle.addEventListener("click", () => {
                this.toggleDarkMode();
            });
        }

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.setTheme(this.isDarkMode);
        this.saveTheme(this.isDarkMode);

        // Add a little animation feedback
        this.darkModeToggle.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.darkModeToggle.style.transform = "scale(1)";
        }, 150);
    }

    setTheme(isDark) {
        if (isDark) {
            this.body.classList.add("dark");
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            this.body.classList.remove("dark");
            document.documentElement.setAttribute("data-bs-theme", "light");
        }

        // Update button aria-label
        if (this.darkModeToggle) {
            this.darkModeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        }
    }

    saveTheme(isDark) {
        try {
            localStorage.setItem("darkMode", isDark ? "true" : "false");
        } catch (e) {
            console.warn("Could not save theme preference:", e);
        }
    }

    getSavedTheme() {
        try {
            const saved = localStorage.getItem("darkMode");
            if (saved !== null) {
                return saved === "true";
            }
        } catch (e) {
            console.warn("Could not read theme preference:", e);
        }

        // Default to system preference
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

            // Only update if user hasn't manually set a preference
            mediaQuery.addEventListener("change", (e) => {
                if (localStorage.getItem("darkMode") === null) {
                    this.isDarkMode = e.matches;
                    this.setTheme(this.isDarkMode);
                }
            });
        }
    }
}

// Initialize dark mode toggle when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new DarkModeToggle();

    // Initialize Bootstrap components that need JS
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
});
