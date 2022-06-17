import { ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import usePayload from "../hooks/usePayload";
import { QuestionStackParams } from "./QuestionScreen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Center, Container, Heading, Text } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";
import { QuestionContext } from "../contexts/QuestionContext";

type Props = {};

const WorkflowLoading = (props: Props) => {
    const { error, isLoading, payload } = usePayload();
    const { finishedCardGroups, isLoggedIn } = useContext(QuestionContext);
    const [done, setDone] = useState(false);

    const isFocused = useIsFocused();
    const navigation =
        useNavigation<
            StackNavigationProp<QuestionStackParams, "WorkflowLoading">
        >();

    useEffect(() => {
        if (!isLoading && payload != undefined && isFocused) {
            if (
                !payload[0].eligibility_module.card_groups.every((card_group) =>
                    finishedCardGroups.includes(card_group.id)
                )
            ) {
                for (const card_group of payload[0].eligibility_module
                    .card_groups) {
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
                !payload[0].process_module.card_groups.every((card_group) =>
                    finishedCardGroups.includes(card_group.id)
                )
            ) {
                for (const card_group of payload[0].process_module
                    .card_groups) {
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
    }, [payload, isFocused]);

    return (
        <Box flex={1} justifyContent="center">
            <Center>
                <Container centerContent>
                    {done ? (
                        <Text>You're all done for now.</Text>
                    ) : (
                        <ActivityIndicator
                            size="large"
                            color={customTheme.colors.primary[500]}
                        />
                    )}
                </Container>
            </Center>
        </Box>
    );
};

export default WorkflowLoading;
