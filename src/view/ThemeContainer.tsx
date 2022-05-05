import { createTheme, PaletteMode, Theme, ThemeProvider } from '@mui/material'
import { createContext, FC, ReactNode, useState } from 'react'

interface IThemeContext {
    switchTheme: (prevMode: PaletteMode) => void
    theme: Theme
}
export const ThemeContext = createContext<IThemeContext>({ theme: createTheme(), switchTheme: () => { } })

const LOCAL_STORAGE_THEME_KEY = 'theme_palette'

const ThemeContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const [themeContext, setThemeContext] = useState<IThemeContext>(() => {
        const localStorageValue = window.localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as PaletteMode
        return {
            theme: createTheme({ palette: { mode: localStorageValue || 'dark' } }),
            switchTheme: (prevMode: PaletteMode) => {
                const newMode: PaletteMode = prevMode === 'dark' ? 'light' : 'dark'
                localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newMode)
                setThemeContext({
                    switchTheme: themeContext.switchTheme,
                    theme: createTheme({ palette: { mode: newMode } }),
                })
            }
        }
    })

    return (
        <ThemeContext.Provider value={themeContext}>
            <ThemeProvider theme={themeContext.theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
export default ThemeContainer
