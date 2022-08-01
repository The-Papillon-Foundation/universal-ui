import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { extendTheme, theme } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { useEffect, useState } from "react";
import { url } from "../constants/Urls";
import { StylesJson } from "../types";

export let customTheme = extendTheme({
    components: {},
    colors: {
        primary: theme.colors.cyan,
        landing_page_background: "",
        copyright_text: "",
        about_text: "",
        greeting_text: "",
        login_button_surface: "",
        signup_button_surface: "",
        navbar_button: "",
        mobile_navbar_button: "",
        large_question_screen_background: "",
        mobile_question_screen_background: "",
        org_name_heading: "",
        hamburger: "",
        button_surface: "",
        arrow_button: "",
        placeholder_question_text: "",
        question_bottom_outline: "",
        info_card_title: "",
        home_screen_navbar_background: "",
        home_screen_navbar_title: "",
        home_screen_navbar_item: "",
    },
    fonts: {
        default: "",
        "question-heading": "",
        "question-text": "",
    },
});
export let customAssets: {
    image_urls: { [key: string]: ColorType };
    copy: { [key: string]: string };
} = {
    image_urls: {},
    copy: {},
};

const applyRemoteStyles = (stylesJson: StylesJson) => {
    customTheme = extendTheme({
        ...customTheme,
        colors: {
            landing_page_background: stylesJson.colors.landing_page_background,
            copyright_text: stylesJson.colors.copyright_text,
            about_text: stylesJson.colors.about_text,
            greeting_text: stylesJson.colors.greeting_text,
            login_button_surface: stylesJson.colors.login_button_surface,
            signup_button_surface: stylesJson.colors.signup_button_surface,
            navbar_button: stylesJson.colors.navbar_button,
            mobile_navbar_button: stylesJson.colors.mobile_navbar_button,
            large_question_screen_background:
                stylesJson.colors.large_question_screen_background,
            mobile_question_screen_background:
                stylesJson.colors.mobile_question_screen_background,
            org_name_heading: stylesJson.colors.org_name_heading,
            hamburger: stylesJson.colors.hamburger,
            button_surface: stylesJson.colors.button_surface,
            arrow_button: stylesJson.colors.arrow_button,
            placeholder_question_text:
                stylesJson.colors.placeholder_question_text,
            question_bottom_outline: stylesJson.colors.question_bottom_outline,
            info_card_title: stylesJson.colors.info_card_title,
            home_screen_navbar_background:
                stylesJson.colors.home_screen_navbar_background,
            home_screen_navbar_title:
                stylesJson.colors.home_screen_navbar_title,
            home_screen_navbar_item: stylesJson.colors.home_screen_navbar_item,
        },
        fonts: {
            default: stylesJson.fonts.default,
            "question-heading": stylesJson.fonts["question-heading"],
            "question-text": stylesJson.fonts["question-text"],
        },
    });
    customAssets = {
        ...{
            image_urls: {
                logo: stylesJson.image_urls.logo,
                logo_small: stylesJson.image_urls.logo_small,
                logo_xsmall: stylesJson.image_urls.logo_xsmall,
            },
            copy: {
                organization_name: "Papillon Foundation",
            },
        },
    };
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
                    "sf-pro": require("../assets/fonts/SF-PRO/SF-Pro-Display-Regular.otf"),
                    "sf-pro-medium": require("../assets/fonts/SF-PRO/SF-Pro-Display-Medium.otf"),
                    "sf-pro-bold": require("../assets/fonts/SF-PRO/SF-Pro-Display-Bold.otf"),
                    "poppins-bold": require("../assets/fonts/POPPINS/Poppins-Bold.ttf"),
                    "poppins-semibold": require("../assets/fonts/POPPINS/Poppins-SemiBold.ttf"),
                    "poppins-medium": require("../assets/fonts/POPPINS/Poppins-Medium.ttf"),
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
