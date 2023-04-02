import React, { useEffect, useRef, useState } from "react";
import { Input, Stack } from "native-base";
import QuestionButton from "./QuestionButton";
import { customTheme } from "../hooks/useCachedResources";
import QuestionHeader from "./QuestionHeader";

type Props = {
    prompt: string;
    help?: string;
    handleResponse: (value: string) => void;
};

const DollarAmountQuestion = ({ prompt, help, handleResponse }: Props) => {
    const [value, setValue] = useState("");
    const inputElement = useRef<{ focus: () => void }>(null);

    const handleChange = (text: string) => {
        if (value.includes(text)) return setValue(text);
        text = text.replace(/\D/g, "");
        setValue(text);
    };

    const submitDollarAmount = () => {
        handleResponse(value);
        setValue("");
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
                <Input
                    ref={inputElement}
                    value={value != "" ? "$" + value : ""}
                    onChangeText={handleChange}
                    variant="underlined"
                    placeholder={"$100"}
                    keyboardType="number-pad"
                    fontFamily={"sf-pro"}
                    fontSize={{ base: "md", md: "lg" }}
                    paddingX={0}
                    placeholderTextColor={
                        customTheme.colors.placeholder_question_text
                    }
                    onSubmitEditing={submitDollarAmount}
                    w={{ base: "100%", md: undefined }}
                    alignSelf={{ md: "flex-start" }}
                    alignItems={"center"}
                    autoFocus
                />
                <QuestionButton onPress={submitDollarAmount}>Ok</QuestionButton>
            </Stack>
        </>
    );
};

export default DollarAmountQuestion;
