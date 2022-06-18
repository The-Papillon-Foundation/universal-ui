/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { GlobalContextProvider } from "../contexts/GlobalContext";
import DetermineWorkflow from "../screens/DetermineWorkflow";
import LandingScreen from "../screens/LandingScreen";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import QuestionScreen from "../screens/QuestionScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <GlobalContextProvider>
            <NavigationContainer
                linking={LinkingConfiguration}
                // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <RootNavigator />
            </NavigationContainer>
        </GlobalContextProvider>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
                name="Landing"
                component={LandingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetermineWorkflow"
                component={DetermineWorkflow}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Questions"
                component={QuestionScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!", headerTitleAlign: "center" }}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
