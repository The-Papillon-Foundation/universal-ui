import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import useWorkflow from "../hooks/useWorkflow";
import { useCreateSession } from "../hooks/useCreateSession";
import QuestionStack from "../components/QuestionStack";
import { ActivityIndicator } from "react-native-paper";
import { customTheme } from "../hooks/useCachedResources";
import { View } from "native-base";
import useProcessModules from "../hooks/useProcessModules";
import ScreenWithNavbar from "../components/ScreenWithNavbar";
import QuestionContainer from "../components/QuestionContainer";

type Props = {
    route: RouteProp<RootStackParamList, "Process">;
    navigation: StackNavigationProp<RootStackParamList, "Process">;
};

const ProcessScreen = ({ route, navigation }: Props) => {
    // fetch eligibility module
    const { error, isLoading, processModules } = useProcessModules(
        route.params.stateName!
    );
    // creates a session and stores it in global context
    useCreateSession(route.params.stateName!);

    const onFinish = () => {
        navigation.navigate("Review");
    };

    return (
        <ScreenWithNavbar>
            <QuestionContainer>
                {isLoading && (
                    <ActivityIndicator
                        size="large"
                        color={customTheme.colors.primary[500]}
                    />
                )}
                {processModules != undefined && (
                    <QuestionStack
                        module={processModules}
                        navigable={true}
                        onFinish={onFinish}
                    />
                )}
            </QuestionContainer>
        </ScreenWithNavbar>
    );
};

export default ProcessScreen;
