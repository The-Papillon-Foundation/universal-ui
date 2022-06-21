import React from "react";
import { Box, Button, Center, Heading, Spacer, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

const LandingScreen = () => {
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, "Landing">>();

    const navigateToHomeScreen = () => {
        navigation.push("Home");
    };

    const navigateToDetermineWorkflowScreen = () => {
        navigation.push("DetermineWorkflow");
    };
    return (
        <View flex={1} justifyContent={"center"}>
            <Box mx={15}>
                <Heading textAlign={"center"}>Landing</Heading>
                <Spacer my={2} />
                <Button onPress={navigateToHomeScreen}>Login</Button>
                <Spacer my={1} />
                <Button onPress={navigateToDetermineWorkflowScreen}>
                    Get Started
                </Button>
            </Box>
        </View>
    );
};

export default LandingScreen;
