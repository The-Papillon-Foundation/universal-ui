/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import {
    GlobalContext,
    GlobalContextProvider,
} from "../contexts/GlobalContext";
import CaseOverviewScreen from "../screens/CaseOverviewScreen";
import CreateUserScreen from "../screens/CreateUserScreen";
import DetermineWorkflow from "../screens/DetermineWorkflow";
import EligibilityScreen from "../screens/EligibilityScreen";
import HomeScreen from "../screens/HomeScreen";
import { IneligibleScreen } from "../screens/IneligibleScreen";
import LandingScreen from "../screens/LandingScreen";
import Loading from "../screens/Loading";
import LoginScreen from "../screens/LoginScreen";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProcessScreen from "../screens/ProcessScreen";
import ReviewScreen from "../screens/ReviewScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

// import DebugScreen from "../screens/DebugScreen";

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
    const { checkingForSession } = React.useContext(GlobalContext);
    return (
        <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Case" component={CaseOverviewScreen} />

            <Stack.Screen
                name="DetermineWorkflow"
                component={DetermineWorkflow}
            />
            <Stack.Screen name="Eligibility" component={EligibilityScreen} />
            <Stack.Screen name="CreateUser" component={CreateUserScreen} />
            <Stack.Screen name="Process" component={ProcessScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen
                name="Ineligible"
                component={IneligibleScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!", headerTitleAlign: "center" }}
            />
            {/* {process.env.NODE_ENV === "development" && (
                <Stack.Screen name="Debug" component={DebugScreen} />
            )} */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
