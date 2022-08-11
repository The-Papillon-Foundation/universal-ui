import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources, {
    customPaperTheme,
    customTheme,
} from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { NativeBaseProvider } from "native-base";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";

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
                    <PaperProvider theme={customPaperTheme}>
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
