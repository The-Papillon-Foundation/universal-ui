import { Platform, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Spacer, Stack, Text, View } from "native-base";
import QuestionButton from "./QuestionButton";
import QuestionPrompt from "./QuestionPrompt";
import { customTheme } from "../hooks/useCachedResources";
import CustomTextInput from "./CustomTextInput";

type Props = {
    prompt: string;
    handleResponse: (value: string) => void;
};

const TextInputQuestion = ({ prompt, handleResponse }: Props) => {
    const [value, setValue] = useState("");
    const inputElement = useRef<{ focus: () => void }>(null);

    const handleChange = (text: string) => {
        setValue(text);
    };

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [prompt]);

    return (
        <>
            <QuestionPrompt>{prompt}</QuestionPrompt>
            <Stack direction={"column"} space="24px" mt="2">
                <CustomTextInput
                    innerRef={inputElement}
                    value={value}
                    placeholder={prompt}
                    onChangeText={handleChange}
                    onSubmitEditing={() => {
                        setValue("");
                        handleResponse(value);
                    }}
                />
                <QuestionButton
                    onPress={() => {
                        setValue("");
                        handleResponse(value);
                    }}
                >
                    Submit
                </QuestionButton>
            </Stack>
        </>
    );
};

export default TextInputQuestion;

const styles = StyleSheet.create({});
