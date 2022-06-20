import { View, Text } from "react-native";
import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, WorkflowPayload } from "../types";
import { WorkflowContext } from "../contexts/WorkflowContext";
import useWorkflow from "../hooks/useWorkflow";
import { useCreateSession } from "../hooks/useCreateSession";
import { Box, Center, Container } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionStack from "../components/QuestionStack";
import ForceLoginScreen from "../components/ForceLogin";

type Props = {
    route: RouteProp<RootStackParamList, "Workflow">;
};

const Workflow = ({ route }: Props) => {
    const [finishedCardGroups, setFinishedCardGroups] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { error, isLoading, data } = useWorkflow(route.params.stateName!);
    useCreateSession(route.params.stateName!);
    const [done, setDone] = useState(false);

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
            <Box flex={1} justifyContent="center">
                <Center>
                    <Container centerContent>
                        {done && <Text>You're all done for now.</Text>}
                        {isLoading && (
                            <ActivityIndicator
                                size="large"
                                color={customTheme.colors.primary[500]}
                            />
                        )}
                        {error && <Text>An error has occurred</Text>}
                        {data != undefined &&
                            (readyForEligibilityModule() ? (
                                <QuestionStack
                                    module={data.eligibility_module}
                                />
                            ) : null)}
                        {data != undefined &&
                            (readyForLogin() ? <ForceLoginScreen /> : null)}
                        {data != undefined &&
                            !isFinished() &&
                            (readyForProcessModule() ? (
                                <QuestionStack module={data.process_module} />
                            ) : null)}
                        {isFinished() && <Text>You are done</Text>}
                    </Container>
                </Center>
            </Box>
        </WorkflowContext.Provider>
    );
};

export default Workflow;
