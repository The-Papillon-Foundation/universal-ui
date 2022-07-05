import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { extendTheme, theme } from "native-base";
import { useEffect, useState } from "react";
import { url } from "../constants/Urls";
import { StylesJson } from "../types";

export let customTheme = theme;

const applyRemoteStyles = (stylesJson: StylesJson) => {
    customTheme = extendTheme({
        colors: {
            primary: theme.colors[stylesJson.colors.primary as "white"],
            surface: theme.colors[stylesJson.colors.surface as "white"][200],
            "surface-secondary":
                theme.colors[
                    stylesJson.colors["surface-secondary"] as "white"
                ][500],
            "on-surface": {
                heading:
                    theme.colors[
                        stylesJson.colors["on-surface"]["heading"] as "white"
                    ][500],
                text: theme.colors[
                    stylesJson.colors["on-surface"]["text"] as "white"
                ][400],
            },
            "button-surface":
                theme.colors[
                    stylesJson.colors["button-surface"] as "white"
                ][500],
            "on-button-surface":
                theme.colors[stylesJson.colors["on-button-surface"] as "white"],
            "date-field-outline-inactive":
                stylesJson.colors["date-field-outline-inactive"],
            "date-field-outline-active":
                stylesJson.colors["date-field-outline-active"],
            "multi-select-active":
                theme.colors[
                    stylesJson.colors["multi-select-active"] as "white"
                ],
        },
        fonts: {
            default: stylesJson.fonts.default,
            "question-heading": stylesJson.fonts["question-heading"],
            "question-text": stylesJson.fonts["question-text"],
        },
    });
};

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const styleName = "test";

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
                });
                const stylesResponse = await fetch(
                    `${url}/styles/${styleName}`
                );
                const stylesJson: StylesJson = await stylesResponse.json();
                applyRemoteStyles(stylesJson);
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
