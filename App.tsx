import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources, { customTheme } from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { NativeBaseProvider } from "native-base";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";

const paperTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: customTheme.colors.cyan[800],
        disabled: "gray",
        text: customTheme.colors.cyan[700],
    },
    fonts: {
        ...DefaultTheme.fonts,
        regular: { fontFamily: "sf-pro" },
        medium: { fontFamily: "sf-pro-medium" },
    },
};

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const queryClient = new QueryClient();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <NativeBaseProvider theme={customTheme}>
                    <PaperProvider theme={paperTheme}>
                        <SafeAreaProvider>
                            <Navigation colorScheme={colorScheme} />
                            <StatusBar />
                        </SafeAreaProvider>
                    </PaperProvider>
                </NativeBaseProvider>
            </QueryClientProvider>
        );
    }
}
