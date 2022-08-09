import { StyleSheet } from "react-native";
import React from "react";
import { Spacer, Stack } from "native-base";
import QuestionButton from "./QuestionButton";
import QuestionPrompt from "./QuestionPrompt";

type Props = {
    prompt: string;
    handleResponse: (response: boolean) => void;
};

const TrueOrFalseQuestion = ({ prompt, handleResponse }: Props) => {
    return (
        <>
            <QuestionPrompt>{prompt}</QuestionPrompt>
            <Stack
                direction={{ base: "column", md: "row" }}
                w={{ base: "100%", md: "40%" }}
                justifyContent={"space-between"}
                space={{ base: "8px", md: "16px" }}
                mt="15px"
            >
                <QuestionButton onPress={() => handleResponse(true)}>
                    True
                </QuestionButton>
                <QuestionButton onPress={() => handleResponse(false)}>
                    False
                </QuestionButton>
            </Stack>
        </>
    );
};

export default TrueOrFalseQuestion;
