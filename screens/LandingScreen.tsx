import React, { useContext } from "react";
import { Box, Button, Center, Heading, Spacer, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { GlobalContext } from "../contexts/GlobalContext";

const LandingScreen = () => {
    const { sessionId } = useContext(GlobalContext);
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, "Landing">>();

    const navigateToHomeScreen = () => {
        navigation.push("Home");
    };

    const navigateToDetermineWorkflowScreen = () => {
        navigation.push("DetermineWorkflow");
    };
    return (
        <View flex={1} justifyContent={"center"} alignItems="center">
            <View mx={15} maxW={300}>
                <Heading textAlign={"center"}>Landing</Heading>
                <View my={2} />
                <Button onPress={navigateToHomeScreen}>Login</Button>
                <View my={1} />
                <Button onPress={navigateToDetermineWorkflowScreen}>
                    Get Started
                </Button>
            </View>
        </View>
    );
};

export default LandingScreen;
