import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "native-base";
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
                justifyContent={"flex-start"}
                space="2.5"
                mt="2"
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
