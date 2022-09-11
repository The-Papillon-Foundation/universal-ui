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

const PhoneNumberQuestion = ({ prompt, help, handleResponse }: Props) => {
    const [value, setValue] = useState("");
    const inputElement = useRef<{ focus: () => void }>(null);

    const handleChange = (text: string) => {
        if (value.includes(text)) return setValue(text);
        text = text.replace(/\D/g, "");
        text = text.substring(0, 10);
        let formatted = "";
        if (text.length > 2) {
            formatted =
                "(" + text.substring(0, 3) + ") " + text.substring(3, 6);
        }
        if (text.length > 5) {
            formatted += "-" + text.substring(6);
        }
        setValue(formatted || text);
    };

    const submitPhoneNumber = () => {
        let strippedPhoneNumber = value.replaceAll(/\D/g, "");
        handleResponse(strippedPhoneNumber);
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
                    value={value}
                    onChangeText={handleChange}
                    variant="underlined"
                    placeholder={"(123) 867-5309"}
                    keyboardType="number-pad"
                    fontFamily={"sf-pro"}
                    fontSize={{ base: "md", md: "lg" }}
                    paddingX={0}
                    textAlign="center"
                    placeholderTextColor={
                        customTheme.colors.placeholder_question_text
                    }
                    onSubmitEditing={submitPhoneNumber}
                    w={{ base: "100%", md: undefined }}
                    alignSelf={{ md: "flex-start" }}
                    alignItems={"center"}
                    autoFocus
                />
                <QuestionButton onPress={submitPhoneNumber}>Ok</QuestionButton>
            </Stack>
        </>
    );
};

export default PhoneNumberQuestion;
