/**
 * Generates a theme based on the current mode (light or dark).
 * 
 * The function returns an object containing color values for various UI elements 
 * such as background, text, border, and blue shades. The values are adjusted 
 * based on whether the current theme mode is 'light' or 'dark'.
 * 
 * @param {string} mode - The current theme mode, either 'light' or 'dark'.
 * @returns {object} An object containing the theme colors.
 */
export const theme = (mode: string) => {
    // Define light and dark mode color values
    const lightMode = {
      primary: '#fafafa',
      secondary: '#e4e5f1',
      tertiary: '#d2d3db',
      blue: '#0288d1',
      font: '#000000',
    };
  
    const darkMode = {
      primary: '#3e3e42',
      secondary: '#2d2d30',
      tertiary: '#252526',
      blue: '#29b6f6',
      font: '#ffffff',
    };
  
    // Return the appropriate theme based on the mode
    return {
        primary: mode === 'light' ? lightMode.primary : darkMode.primary,
        secondary: mode === 'light' ? lightMode.secondary : darkMode.secondary,
        tertiary: mode === 'light' ? lightMode.tertiary : darkMode.tertiary,
        blue: mode === 'light' ? lightMode.blue : darkMode.blue,
        font: mode === 'light' ? lightMode.font : darkMode.font,
    };
  };
  