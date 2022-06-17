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
    prompt: string;
    options: string[];
    handleResponse: (value: string) => void;
};

const MultipleChoiceQuestion = ({ prompt, options, handleResponse }: Props) => {
    const [value, setValue] = useState<string>("");
    const { setFinishedCardGroups } = useContext(QuestionContext);

    return (
        <QuestionContainer>
            <Text
                color={customTheme.colors["on-surface"].text}
                fontFamily={"question-text"}
                textAlign={"center"}
                w={"300"}
            >
                {prompt}
            </Text>
            <Stack space="2.5" mt="2" px="8">
                <Radio.Group
                    name={prompt as string}
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                >
                    {options.map((option, index) => (
                        <Radio key={option + index} value={option} my={1}>
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse(value)}
                >
                    Submit
                </Button>
            </Stack>
        </QuestionContainer>
    );
};

export default MultipleChoiceQuestion;

const styles = StyleSheet.create({});
