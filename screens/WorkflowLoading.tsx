import { ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import usePayload from "../hooks/useWorkflow";
import { QuestionStackParams } from "./QuestionScreen";
import {
    RouteProp,
    useIsFocused,
    useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Center, Container, Heading, Text } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";
import { QuestionContext } from "../contexts/QuestionContext";
import { useCreateSession } from "../hooks/useCreateSession";

type Props = {
    route: RouteProp<QuestionStackParams, "WorkflowLoading">;
};

const WorkflowLoading = ({ route }: Props) => {
    const { error, isLoading, data } = usePayload(route.params.stateName!);
    const { finishedCardGroups, isLoggedIn } = useContext(QuestionContext);
    useCreateSession(route.params.stateName!);
    const [done, setDone] = useState(false);

    const isFocused = useIsFocused();
    const navigation =
        useNavigation<
            StackNavigationProp<QuestionStackParams, "WorkflowLoading">
        >();

    useEffect(() => {
        if (route.params.stateName == undefined) {
            navigation.navigate("Home");
            return;
        }
        if (!isLoading && data != undefined && isFocused) {
            if (
                !data.eligibility_module?.card_groups.every((card_group) =>
                    finishedCardGroups.includes(card_group.id)
                )
            ) {
                for (const card_group of data.eligibility_module.card_groups) {
                    if (!finishedCardGroups.includes(card_group.id)) {
                        navigation.push("Question", {
                            card: card_group.cards[0],
                            group: card_group,
                        });
                        break;
                    }
                }
            } else if (!isLoggedIn) {
                navigation.push("ForceLogin");
            } else if (
                isLoggedIn &&
                !data.process_module?.card_groups.every((card_group) =>
                    finishedCardGroups.includes(card_group.id)
                )
            ) {
                for (const card_group of data.process_module.card_groups) {
                    if (!finishedCardGroups.includes(card_group.id)) {
                        navigation.push("Question", {
                            card: card_group.cards[0],
                            group: card_group,
                        });
                        break;
                    }
                }
            } else {
                setDone(true);
            }
        }
    }, [data, isFocused]);

    return (
        <Box flex={1} justifyContent="center">
            <Center>
                <Container centerContent>
                    {done ? (
                        <Text>You're all done for now.</Text>
                    ) : isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={customTheme.colors.primary[500]}
                        />
                    ) : error ? (
                        <Text>An error has occurred</Text>
                    ) : null}
                </Container>
            </Center>
        </Box>
    );
};

export default WorkflowLoading;
