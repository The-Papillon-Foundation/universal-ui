import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import {
    Button,
    Center,
    Container,
    Heading,
    Radio,
    Stack,
    Text,
} from "native-base";
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

const MultipleChoiceQuestion = ({ route, navigation }: Props) => {
    const [value, setValue] = useState<string>("");
    const { card, group } = route.params;
    const { setFinishedCardGroups } = useContext(QuestionContext);

    const handleResponse = () => {
        if (card.question.pass.includes(value)) {
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
                message: `Because the only correct answers to the question: \n${
                    card.question.prompt
                }\nAre: ${card.question.pass.join(", ")}`,
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
            <Stack space="2.5" mt="2" px="8">
                <Radio.Group
                    name={card.question.prompt as string}
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                >
                    {card.question.options.map((option) => (
                        <Radio value={option} my={1}>
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse()}
                >
                    Submit
                </Button>
            </Stack>
        </QuestionContainer>
    );
};

export default MultipleChoiceQuestion;

const styles = StyleSheet.create({});
