import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, WorkflowPayload } from "../types";
import { WorkflowContext } from "../contexts/WorkflowContext";
import useWorkflow from "../hooks/useWorkflow";
import { useCreateSession } from "../hooks/useCreateSession";
import { Box, Center, Container, View, Text, Button } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionStack from "../components/QuestionStack";
import ForceLoginScreen from "../components/ForceLogin";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    route: RouteProp<RootStackParamList, "Workflow">;
    navigation: StackNavigationProp<RootStackParamList, "Workflow">;
};

const Workflow = ({ route, navigation }: Props) => {
    const [finishedCardGroups, setFinishedCardGroups] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { error, isLoading, data } = useWorkflow(route.params.stateName!);
    useCreateSession(route.params.stateName!);

    const goHome = () => {
        navigation.navigate("Home");
    };
    const goReview = () => {
        navigation.navigate("Review");
    };

    const readyForEligibilityModule = () => {
        if (
            !data.eligibility_module.card_groups.every((card_group) =>
                finishedCardGroups.includes(card_group.id)
            )
        ) {
            return true;
        }
        return false;
    };

    const readyForLogin = () => {
        if (!isLoggedIn && !readyForEligibilityModule()) {
            return true;
        }
        return false;
    };

    const readyForProcessModule = () => {
        if (!readyForLogin() && !readyForEligibilityModule()) {
            // We might possibly want to do a manual check like the eligibility module check.
            // This will suffice for now.
            return true;
        }
        return false;
    };

    const isFinished = () => {
        if (
            data != undefined &&
            !isLoading &&
            data.eligibility_module.card_groups.every((card_group) =>
                finishedCardGroups.includes(card_group.id)
            ) &&
            data.process_module.card_groups.every((card_group) =>
                finishedCardGroups.includes(card_group.id)
            )
        ) {
            return true;
        }
        return false;
    };

    return (
        <WorkflowContext.Provider
            value={{
                finishedCardGroups,
                setFinishedCardGroups,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            <View
                flex={1}
                justifyContent="center"
                alignContent={"center"}
                backgroundColor={"blue.100"}
            >
                {isLoading && (
                    <ActivityIndicator
                        size="large"
                        color={customTheme.colors.primary[500]}
                    />
                )}
                {error && <Text>An error has occurred</Text>}
                {data != undefined &&
                    (readyForEligibilityModule() ? (
                        <QuestionStack module={data.eligibility_module} />
                    ) : null)}
                {data != undefined &&
                    (readyForLogin() ? <ForceLoginScreen /> : null)}
                {data != undefined &&
                    !isFinished() &&
                    (readyForProcessModule() ? (
                        <QuestionStack module={data.process_module} />
                    ) : null)}
                {isFinished() && (
                    <>
                        <Text textAlign={"center"}>You are done</Text>
                        <Button mx="20" onPress={goHome}>
                            Go Home
                        </Button>
                        <Button mx="20" onPress={goReview}>
                            Review Answers
                        </Button>
                    </>
                )}
            </View>
        </WorkflowContext.Provider>
    );
};

export default Workflow;
