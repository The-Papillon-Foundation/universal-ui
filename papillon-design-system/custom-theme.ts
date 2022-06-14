import { extendTheme, theme } from "native-base";

export const customTheme = extendTheme({
    colors: {
        surface: theme.colors.blueGray[200],
        "surface-secondary": theme.colors.blueGray[500],
        "on-surface": {
            heading: theme.colors.darkBlue[500],
            text: theme.colors.darkBlue[400],
        },
        "button-surface": theme.colors.emerald[500],
        "on-button-surface": theme.colors.white,
        "date-field-outline-inactive": "gray",
        "date-field-outline-active": "#f08d1a",
        "multi-select-active": theme.colors.emerald,
    },
    fonts: {
        "question-heading": "Arial",
        "question-text": "space-mono",
    },
});
