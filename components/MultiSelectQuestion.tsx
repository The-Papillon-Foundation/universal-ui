import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React from "react";
import {
    Button,
    Center,
    Checkbox,
    Container,
    Heading,
    Radio,
    Stack,
    Text,
} from "native-base";
import QuestionContainer from "./QuestionContainer";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    place: number;
    prompt: string;
    options: string[];
    handleResponse: (event: GestureResponderEvent) => void;
};

const MultiSelectQuestion = ({
    place,
    prompt,
    options,
    handleResponse,
}: Props) => {
    const [inputDate, setInputDate] = React.useState<Date | undefined>(
        undefined
    );
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
            >
                {prompt}
            </Text>
            <Checkbox.Group
                accessibilityLabel="multi-select"
                color={customTheme.colors["on-surface"].text}
            >
                {options.map((option) => (
                    <Checkbox
                        colorScheme={"multi-select-active"}
                        m={2}
                        key={option}
                        value={option}
                        _text={{ color: customTheme.colors["on-surface"].text }}
                    >
                        {option}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <Button
                bgColor={customTheme.colors["button-surface"]}
                color={customTheme.colors["on-button-surface"]}
                onPress={handleResponse}
            >
                Submit
            </Button>
        </QuestionContainer>
    );
};

export default MultiSelectQuestion;

const styles = StyleSheet.create({});
