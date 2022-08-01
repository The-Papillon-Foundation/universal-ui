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
import QuestionPrompt from "./QuestionPrompt";
import QuestionButton from "./QuestionButton";

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
            <QuestionPrompt> {prompt}</QuestionPrompt>

            <Checkbox.Group accessibilityLabel="multi-select">
                {options.map((option) => (
                    <Checkbox
                        colorScheme={"multi-select-active"}
                        m={2}
                        key={option}
                        value={option}
                        _text={{ color: "black" }}
                    >
                        {option}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <QuestionButton onPress={() => handleResponse()}>
                Submit
            </QuestionButton>
        </QuestionContainer>
    );
};

export default MultiSelectQuestion;

const styles = StyleSheet.create({});
