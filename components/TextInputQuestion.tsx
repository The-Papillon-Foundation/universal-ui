import React, { useEffect, useRef, useState } from "react";
import { Stack } from "native-base";
import QuestionButton from "./QuestionButton";
import CustomTextInput from "./CustomTextInput";
import QuestionHeader from "./QuestionHeader";

type Props = {
    prompt: string;
    help?: string;
    handleResponse: (value: string) => void;
};

const TextInputQuestion = ({ prompt, help, handleResponse }: Props) => {
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
            <QuestionHeader prompt={prompt} help={help} />
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
