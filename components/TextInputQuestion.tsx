import { Platform, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Spacer, Stack, Text, View } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionButton from "./QuestionButton";
import QuestionPrompt from "./QuestionPrompt";

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
                <Input
                    ref={inputElement}
                    value={value}
                    onChangeText={handleChange}
                    variant="underlined"
                    placeholder={prompt}
                    fontFamily={"sf-pro"}
                    fontSize={{ base: "md", md: "lg" }}
                    placeholderTextColor={"#9AB8BF"}
                    onSubmitEditing={() => {
                        setValue("");
                        handleResponse(value);
                    }}
                    w={{ base: "100%", md: "55%" }}
                    autoFocus
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
