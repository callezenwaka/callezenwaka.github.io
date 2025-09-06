class Theme {
  constructor() {
    this.loadTheme();
    this.setupSystemThemeListener();
  }

  addDarkTheme() {
    const darkThemeLinkEl = document.createElement("link");
    darkThemeLinkEl.setAttribute("rel", "stylesheet");
    darkThemeLinkEl.setAttribute("href", "./assets/dark.css");
    darkThemeLinkEl.setAttribute("id", "dark-theme-style");
    const docHead = document.querySelector("head");
    docHead?.append(darkThemeLinkEl);
    localStorage.setItem("theme", "dark");
  }

  removeDarkTheme() {
    const darkThemeLinkEl = document.querySelector("#dark-theme-style");
    const parentNode = darkThemeLinkEl?.parentNode;
    parentNode?.removeChild(darkThemeLinkEl);
    localStorage.setItem("theme", "light");
  }

  darkThemeSwitch() {
    const darkThemeLinkEl = document.querySelector("#dark-theme-style");
    if (!darkThemeLinkEl) {
      this.addDarkTheme();
    } else {
      this.removeDarkTheme();
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    
    // Check if dark theme is already applied (by inline script)
    const darkThemeAlreadyApplied = document.querySelector("#dark-theme-style");
    
    // If user has a saved preference, use it
    if (savedTheme === "dark") {
      if (!darkThemeAlreadyApplied) {
        this.addDarkTheme();
      }
    } else if (savedTheme === "light") {
      // Explicitly set light theme (remove any dark theme)
      this.removeDarkTheme();
    } else {
      // No saved preference - check device preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        if (!darkThemeAlreadyApplied) {
          this.addDarkTheme();
        }
      } else {
        this.removeDarkTheme();
      }
    }
  }

  setupSystemThemeListener() {
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only apply system theme if user hasn't made a manual choice
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === null) {
        if (e.matches) {
          this.addDarkTheme();
        } else {
          this.removeDarkTheme();
        }
      }
    });
  }
}

export default Theme;
