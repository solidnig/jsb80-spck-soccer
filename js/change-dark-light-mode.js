class DarkModeToggle {
  constructor() {
    this.darkModeToggle = document.getElementById("darkModeToggle");
    this.body = document.body;
    this.isDarkMode = this.getSavedTheme();

    this.init();
  }

  init() {
    this.setTheme(this.isDarkMode);

    if (this.darkModeToggle) {
      this.darkModeToggle.addEventListener("click", () => {
        this.toggleDarkMode();
      });
    }

    this.watchSystemTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme(this.isDarkMode);
    this.saveTheme(this.isDarkMode);

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

    if (this.darkModeToggle) {
      this.darkModeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
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

    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        if (localStorage.getItem("darkMode") === null) {
          this.isDarkMode = e.matches;
          this.setTheme(this.isDarkMode);
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DarkModeToggle();
});
