export default class ThemeChanger {
  constructor () {
    this.loadTheme()
  }

  private addDarkTheme (): void {
    const darkThemeLinkEl = document.createElement('link')
    darkThemeLinkEl.setAttribute('rel', 'stylesheet')
    darkThemeLinkEl.setAttribute('href', '/dark.css')
    darkThemeLinkEl.setAttribute('id', 'dark-theme-style')
    const docHead = document.querySelector('head')
    docHead?.append(darkThemeLinkEl)
    localStorage.setItem('theme', 'dark')
  }

  private removeDarkTheme (): void {
    const darkThemeLinkEl = document.querySelector('#dark-theme-style')
    const parentNode = darkThemeLinkEl?.parentNode
    parentNode?.removeChild(darkThemeLinkEl!)
    localStorage.removeItem('theme')
  }

  public darkThemeSwitch (): void {
    const darkThemeLinkEl = document.querySelector('#dark-theme-style')
    if (!darkThemeLinkEl) {
      this.addDarkTheme()
    } else {
      this.removeDarkTheme()
    }
  }

  public loadTheme(): void {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      this.addDarkTheme()
    }
  }
}
