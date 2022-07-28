import { StyleSheet } from "react-native";
import React from "react";
import { Spacer, Stack } from "native-base";
import QuestionButton from "./QuestionButton";
import QuestionPrompt from "./QuestionPrompt";

type Props = {
    prompt: string;
    handleResponse: (response: "yes" | "no") => void;
};

const YesOrNoQuestion = ({ prompt, handleResponse }: Props) => {
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
                <QuestionButton onPress={() => handleResponse("yes")}>
                    Yes
                </QuestionButton>
                <QuestionButton onPress={() => handleResponse("no")}>
                    No
                </QuestionButton>
            </Stack>
        </>
    );
};

export default YesOrNoQuestion;

const styles = StyleSheet.create({});
