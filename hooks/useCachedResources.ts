import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { extendTheme, theme } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { useEffect, useState } from "react";
import { DefaultTheme } from "react-native-paper";
import { url } from "../constants/Urls";
import { StylesJson } from "../types";

export let customTheme = extendTheme({
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
        complete_status_background: "",
        complete_status_text: "",
        in_progress_status_background: "",
        not_started_status_background: "",
        incomplete_status_text: "",
        case_card_background: "",
        case_card_border: "",
        case_horizontal_divider: "",
        case_card_title: "",
        case_card_case_number: "",
        case_card_dates: "",
        case_overview_screen_mobile_background: "",
        case_overview_screen_timeline_desktop_background: "",
        case_overview_screen_desktop_background: "",
        document_management_button_background: "",
        document_management_button_border: "",
        document_management_button_icon: "",
        incomplete_status_bar: "",
        instruction_text: "",
    },
    fonts: {
        default: "",
        "question-heading": "",
        "question-text": "",
    },
});

export let customPaperTheme = DefaultTheme;
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
            primary: stylesJson.colors.primary,
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
            complete_status_background:
                stylesJson.colors.complete_status_background,
            complete_status_text: stylesJson.colors.complete_status_text,
            in_progress_status_background:
                stylesJson.colors.in_progress_status_background,
            not_started_status_background:
                stylesJson.colors.not_started_status_background,
            incomplete_status_text: stylesJson.colors.incomplete_status_text,
            case_card_background: stylesJson.colors.case_card_background,
            case_card_border: stylesJson.colors.case_card_border,
            case_horizontal_divider: stylesJson.colors.case_horizontal_divider,
            case_card_title: stylesJson.colors.case_card_title,
            case_card_case_number: stylesJson.colors.case_card_case_number,
            case_card_dates: stylesJson.colors.case_card_dates,
            case_overview_screen_mobile_background:
                stylesJson.colors.case_overview_screen_mobile_background,
            case_overview_screen_timeline_desktop_background:
                stylesJson.colors
                    .case_overview_screen_timeline_desktop_background,
            case_overview_screen_desktop_background:
                stylesJson.colors.case_overview_screen_desktop_background,
            document_management_button_background:
                stylesJson.colors.document_management_button_background,
            document_management_button_border:
                stylesJson.colors.document_management_button_border,
            document_management_button_icon:
                stylesJson.colors.document_management_button_icon,
            incomplete_status_bar: stylesJson.colors.incomplete_status_bar,
            instruction_text: stylesJson.colors.instruction_text,
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
    customPaperTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: customTheme.colors.button_surface,
            disabled: "gray",
            text: customTheme.colors.info_card_title,
        },
        fonts: {
            ...DefaultTheme.fonts,
            regular: { fontFamily: "sf-pro" },
            medium: { fontFamily: "sf-pro-medium" },
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
                    "sf-pro-semibold": require("../assets/fonts/SF-PRO/SF-Pro-Display-Semibold.otf"),
                    "sf-pro-medium": require("../assets/fonts/SF-PRO/SF-Pro-Display-Medium.otf"),
                    "sf-pro-bold": require("../assets/fonts/SF-PRO/SF-Pro-Display-Bold.otf"),
                    "poppins-bold": require("../assets/fonts/POPPINS/Poppins-Bold.ttf"),
                    "poppins-semibold": require("../assets/fonts/POPPINS/Poppins-SemiBold.ttf"),
                    "poppins-medium": require("../assets/fonts/POPPINS/Poppins-Medium.ttf"),
                    "manrope-extrabold": require("../assets/fonts/MANROPE/Manrope-ExtraBold.ttf"),
                    "manrope-semibold": require("../assets/fonts/MANROPE/Manrope-SemiBold.ttf"),
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
