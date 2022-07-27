import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Radio, Stack, Text } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionPrompt from "./QuestionPrompt";

type Props = {
    prompt: string;
    options: string[];
    handleResponse: (value: string) => void;
};

const MultipleChoiceQuestion = ({ prompt, options, handleResponse }: Props) => {
    const [value, setValue] = useState<string>("");

    return (
        <>
            <QuestionPrompt>{prompt}</QuestionPrompt>
            <Stack space="2.5" mt="2">
                <Radio.Group
                    name={prompt}
                    accessibilityLabel={prompt}
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                >
                    {options.map((option, index) => (
                        <Radio
                            accessibilityLabel={option}
                            key={option + index}
                            value={option}
                            my={1}
                        >
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse(value)}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
};

export default MultipleChoiceQuestion;

const styles = StyleSheet.create({});
