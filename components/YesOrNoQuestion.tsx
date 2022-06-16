import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Button, Center, Container, Heading, Stack, Text } from "native-base";
import QuestionContainer from "./QuestionContainer";
import { customTheme } from "../papillon-design-system/custom-theme";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
    QuestionContext,
    QuestionStackParams,
} from "../screens/QuestionScreen";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    route: RouteProp<QuestionStackParams, "Question">;
    navigation: StackNavigationProp<QuestionStackParams, "Question">;
};

const YesOrNoQuestion = ({ route, navigation }: Props) => {
    const { card, group } = route.params;
    const { setFinishedCardGroups } = useContext(QuestionContext);
    const handleResponse = (response: "yes" | "no") => {
        if (response == "yes") {
            if (card.on_true == null) {
                setFinishedCardGroups((finishedCardGroups) => [
                    ...finishedCardGroups,
                    group.id,
                ]);
                navigation.navigate("Start");
                return;
            }
            const nextCardIndex = group.cards.findIndex(
                (c) => c.id == card.on_true
            );
            if (nextCardIndex == -1)
                throw new Error("Next card index out of scope.");
            navigation.push("Question", {
                card: group.cards[nextCardIndex],
                group,
            });
        } else {
            navigation.push("Ineligible", {
                message: `Because you answered no on the previous question: \n${card.question.prompt}`,
            });
        }
    };
    return (
        <QuestionContainer>
            <Text
                color={customTheme.colors["on-surface"].text}
                fontFamily={"question-text"}
                textAlign={"center"}
                w={"300"}
            >
                {card.question.prompt}
            </Text>
            <Stack direction={"row"} space="2.5" mt="2" px="8">
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse("yes")}
                >
                    Yes
                </Button>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse("no")}
                >
                    No
                </Button>
            </Stack>
        </QuestionContainer>
    );
};

export default YesOrNoQuestion;

const styles = StyleSheet.create({});
