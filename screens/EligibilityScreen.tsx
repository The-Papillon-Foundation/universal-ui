import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import useWorkflow from "../hooks/useWorkflow";
import { useCreateSession } from "../hooks/useCreateSession";
import QuestionStack from "../components/QuestionStack";
import { ActivityIndicator } from "react-native-paper";
import { customTheme } from "../hooks/useCachedResources";
import { View } from "native-base";
import useEligibilityModule from "../hooks/useEligibilityModule";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import ScreenWithNavbar from "../components/ScreenWithNavbar";

type Props = {
    route: RouteProp<RootStackParamList, "Eligibility">;
    navigation: StackNavigationProp<RootStackParamList, "Eligibility">;
};

const EligibilityScreen = ({ route, navigation }: Props) => {
    // fetch eligibility module
    const { error, isLoading, eligibilityModule } = useEligibilityModule(
        route.params.stateName!
    );
    // creates a session and stores it in global context
    useCreateSession(route.params.stateName!);

    const onFinish = () => {
        navigation.navigate("CreateUser", {
            stateName: route.params.stateName,
        });
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
                {eligibilityModule != undefined && (
                    <QuestionStack
                        module={eligibilityModule}
                        navigable={false}
                        onFinish={onFinish}
                    />
                )}
            </QuestionContainer>
        </ScreenWithNavbar>
    );
};

export default EligibilityScreen;
