import { View } from "native-base";
import React from "react";
import { customTheme } from "../hooks/useCachedResources";
import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

const ScreenWithNavbar = ({ children }: Props) => {
    return (
        <View
            flex={1}
            bgColor={{
                base: customTheme.colors.mobile_question_screen_background,
                md: customTheme.colors.large_question_screen_background,
            }}
        >
            <Navbar />
            <View flex={1} justifyContent="center" alignItems="center">
                {children}
            </View>
        </View>
    );
};

export default ScreenWithNavbar;
