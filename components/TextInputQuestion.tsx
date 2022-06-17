import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import {
    Button,
    Center,
    Container,
    Heading,
    Input,
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
    handleResponse: (value: string) => void;
};

const TextInputQuestion = ({ prompt, handleResponse }: Props) => {
    const [value, setValue] = useState("");

    const handleChange = (text: string) => {
        setValue(text);
    };

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
            <Stack direction={"row"} space="2.5" mt="2" px="8">
                <Input
                    value={value}
                    w="75%"
                    maxW="300px"
                    onChangeText={handleChange}
                    placeholder="Value Controlled Input"
                    onSubmitEditing={() => handleResponse(value)}
                />
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

export default TextInputQuestion;

const styles = StyleSheet.create({});
