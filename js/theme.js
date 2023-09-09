$(function () {
    var themes = {
        init: function () {
            this.storageKey = 'theme'
            this.themeOptions = {
                dark: 'dark',
                light: 'light'
            }
            let storageTheme = localStorage.getItem(this.storageKey)
            if (storageTheme == null) {
                storageTheme = this.themeOptions.dark
                localStorage.setItem(this.storageKey, storageTheme)
            }
            this.currentTheme = storageTheme
            this.darkTheme = {
                '--main': '#2b2a33',
                '--opposite': '#fff',
                '--secondary': '#616467',
                '--transparency': 'rgba(0, 0, 0, 0.5)'
            }
            this.lightTheme = {
                '--main': '#eee',
                '--opposite': '#000',
                '--secondary': '#c1c7cc',
                '--transparency': 'rgba(255, 255, 255, 0.5)'
            }
            this.setThemeVariables()
        },

        switchTheme: function () {
            switch (this.currentTheme) {
                case this.themeOptions.dark:
                    this.currentTheme = this.themeOptions.light
                    break
                case this.themeOptions.light:
                    this.currentTheme = this.themeOptions.dark
                    break
            }

            localStorage.setItem(this.storageKey, this.currentTheme)

            this.setThemeVariables()
        },

        setThemeVariables: function () {
            switch (this.currentTheme) {
                case this.themeOptions.dark:
                    this.setDarkThemeVariables()
                    $('.theme').prop('checked', true)
                    break
                case this.themeOptions.light:
                    this.setLightThemeVariables()
                    $('.theme').prop('checked', false)
                    break
            }
        },

        setDarkThemeVariables: function () {
            for (const darkVariable in this.darkTheme) {
                $(':root').css(darkVariable, this.darkTheme[darkVariable]);
            }
        },

        setLightThemeVariables: function () {
            for (const lightVariable in this.lightTheme) {
                $(':root').css(lightVariable, this.lightTheme[lightVariable]);
            }
        },
    }

    $('.theme-toggle').on('change', function () {
        themes.switchTheme()
    })

    themes.init()
});