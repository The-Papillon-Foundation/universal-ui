import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Center, Container, Heading, Stack, Text } from "native-base";
import QuestionContainer from "./QuestionContainer";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    place: number;
    prompt: string;
    handleResponse: (event: GestureResponderEvent) => void;
};

const YesOrNoQuestion = ({ place, prompt, handleResponse }: Props) => {
    return (
        <QuestionContainer>
            <Heading
                color={customTheme.colors["on-surface"].heading}
                fontFamily={"question-heading"}
            >
                Question {place + 1}
            </Heading>
            <Text
                color={customTheme.colors["on-surface"].text}
                fontFamily={"question-text"}
                textAlign={"center"}
                w={"300"}
            >
                {prompt}
            </Text>
            <Stack direction={"row"} space="2.5" mt="2" px="8">
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={handleResponse}
                >
                    Yes
                </Button>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={handleResponse}
                >
                    No
                </Button>
            </Stack>
        </QuestionContainer>
    );
};

export default YesOrNoQuestion;

const styles = StyleSheet.create({});
