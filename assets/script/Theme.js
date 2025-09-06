class Theme {
  constructor() {
    this.loadTheme();
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
    localStorage.removeItem("theme");
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
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      this.addDarkTheme();
    }
  }
}

export default Theme;
