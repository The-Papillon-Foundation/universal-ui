import React from "react";
import { Box, Button, Center, Heading, Spacer, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { Alert } from "react-native";

const LandingScreen = () => {
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, "Landing">>();

    const navigateToHomeScreen = () => {
        alert("Home screen not yet implemented.");
    };

    const navigateToDetermineWorkflowScreen = () => {
        navigation.push("DetermineWorkflow");
    };
    return (
        <Center flex={1}>
            <Box>
                <Heading>Landing</Heading>
                <Spacer my={2} />
                <Button onPress={navigateToHomeScreen}>Login</Button>
                <Spacer my={1} />
                <Button onPress={navigateToDetermineWorkflowScreen}>
                    Get Started
                </Button>
            </Box>
        </Center>
    );
};

export default LandingScreen;
