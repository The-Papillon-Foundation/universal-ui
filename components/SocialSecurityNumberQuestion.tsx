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

const SocialSecurityNumberQuestion = ({
    prompt,
    help,
    handleResponse,
}: Props) => {
    const [value, setValue] = useState("");
    const inputElement = useRef<{ focus: () => void }>(null);

    const handleChange = (text: string) => {
        if (value.includes(text)) return setValue(text);

        // strip everything out except numbers
        text = text.replace(/\D/g, "");
        // only allow 9 digits
        text = text.substring(0, 9);

        let formatted = "";
        if (text.length > 3) {
            formatted = text.substring(0, 3) + "-" + text.substring(3);
        }
        if (text.length > 5) {
            formatted =
                formatted.substring(0, 6) + "-" + formatted.substring(6);
        }
        setValue(formatted || text);
    };

    const submitSocialSecurityNumber = () => {
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
                    placeholder={"123-45-6789"}
                    keyboardType="number-pad"
                    fontFamily={"sf-pro"}
                    fontSize={{ base: "md", md: "lg" }}
                    paddingX={0}
                    textAlign="center"
                    placeholderTextColor={
                        customTheme.colors.placeholder_question_text
                    }
                    onSubmitEditing={submitSocialSecurityNumber}
                    w={{ base: "100%", md: undefined }}
                    alignSelf={{ md: "flex-start" }}
                    alignItems={"center"}
                    autoFocus
                />
                <QuestionButton onPress={submitSocialSecurityNumber}>
                    Ok
                </QuestionButton>
            </Stack>
        </>
    );
};

export default SocialSecurityNumberQuestion;
