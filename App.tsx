import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { NativeBaseProvider } from "native-base";
import { customTheme } from "./papillon-design-system/custom-theme";
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
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar />
                    </SafeAreaProvider>
                </NativeBaseProvider>
            </QueryClientProvider>
        );
    }
}
