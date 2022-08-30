import React from "react";
import { Stack } from "native-base";
import QuestionButton from "./QuestionButton";
import QuestionHeader from "./QuestionHeader";

type Props = {
    prompt: string;
    help?: string;
    handleResponse: (response: boolean) => void;
};

const YesOrNoQuestion = ({ prompt, help, handleResponse }: Props) => {
    return (
        <>
            <QuestionHeader prompt={prompt} help={help} />
            <Stack
                direction={{ base: "column", md: "row" }}
                w={{ base: "100%", md: "40%" }}
                justifyContent={"space-between"}
                space={{ base: "8px", md: "16px" }}
                mt="15px"
            >
                <QuestionButton onPress={() => handleResponse(true)}>
                    Yes
                </QuestionButton>
                <QuestionButton onPress={() => handleResponse(false)}>
                    No
                </QuestionButton>
            </Stack>
        </>
    );
};

export default YesOrNoQuestion;
